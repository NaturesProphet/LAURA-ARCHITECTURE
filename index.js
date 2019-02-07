const W3CWebSocket = require( 'websocket' ).w3cwebsocket;
const conf = require( './config.json' ); // arquivo de configuração
const sendRequest = require( 'request-promise' ); // lib que faz requisições http
const sleep = require( 'sleep' ); // funcionalidade para fazer o código aguardar

console.clear();
console.log( `\n[ INFO ] Tentando se conectar com ${conf.ServerAddress} ....\n` );
var client = new W3CWebSocket( `ws://${conf.ServerAddress}:${conf.ServerPort}${conf.SocketEndPoint}` );

client.onerror = function () {
    console.log( `[ ERRO ] Falhou em tentar se conectar com ${ServerAddress}` );
};

client.onopen = function () {
    console.log( '[ INFO ] Conexão estabelecida com sucesso !\n' );
    console.log( `[ INFO ] Ouvindo a porta ${conf.ServerPort} no dispositivo ${conf.ServerAddress} ...\n\n` );
};

client.onclose = function () {
    console.log( '[ INFO ] Cliente fechado.' );
};

client.onmessage = function ( e ) {
    if ( typeof e.data === 'string' ) { //filtro pra não receber eventuais entulhos
        var msg = JSON.parse( e.data );
        if (
            msg.type == "ACTIVATION"
            && msg.situation.type == "mqc.AllETABiggerThanTTT"
            && msg.situation.active == true
        ) {
            StartPipeline( msg );
        }
    }
};


/**
 * Inicia o fluxo do Stage 3
 */

async function StartPipeline ( msg ) {
    //força o programa a aguardar por 5 segundos antes de continuar
    sleep.sleep( 5 );

    //prepara os dados da requisição http que será feita
    const options = {
        uri: `http://${conf.ServerAddress}:${conf.ServerPort}${conf.SituationsEndPoint}/${msg.situation.id}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // transforma automagicamente o resultado em json
    };

    var VerificationMsg; // receberá o resultado da requisição

    await sendRequest( options )
        .then( function ( situation ) {
            VerificationMsg = situation;
        } )
        .catch( function ( err ) {
            console.log( "[ ERRO ] A requisição falhou\n", err.message );
        } );

    if ( VerificationMsg.active == true ) {
        console.log( `\n\n####################################################################` );
        console.log( `####################### [!] WARNING [!] ############################` );
        console.log( `--------------------------------------------------------------------` );
        console.log( "TODOS OS OBSERVADORES ESTÃO LONGE DEMAIS PARA CHEGAR A TEMPO" );
        console.log( `--------------------------------------------------------------------\n` );
        console.log( `PRODUTO EM RISCO: ${VerificationMsg.participations.product.descriptor}` );
        console.log( `TEMPERATURA MÁXIMA: ${VerificationMsg.participations.product.attributes.maxTemperature}` );
        console.log( `####################################################################` );
        console.log( `####################################################################\n\n` );
    }

    //força o programa a aguardar por mais 10 segundos antes de continuar
    sleep.sleep( 10 );

    // prepara os dados para a próxima requisição http que será feita
    const options2 = {
        uri: `http://${conf.ServerAddress}:${conf.ServerPort}${conf.SituationsEndPoint}?type=mqc.Attending&active=true`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // transforma automagicamente o resultado em json
    };
    var Situations; //receberá o array de situações

    await sendRequest( options2 )
        .then( function ( situations ) {
            Situations = situations;
        } )
        .catch( function ( err ) {
            console.log( "[ ERRO ] A requisição falhou\n", err.message );
        } );

    if ( Situations.length == 0 ) {
        console.log( `\n\n####################################################################` );
        console.log( `####################### [!] WARNING [!] ############################` );
        console.log( `--------------------------------------------------------------------` );
        console.log( "       NENHUM OBSERVADOR RESPONDEU AO CHAMADO ATÉ AGORA" );
        console.log( `--------------------------------------------------------------------` );
        console.log( `####################################################################` );
        console.log( `####################################################################\n\n` );
        StartPipeline( msg );
    } else {
        console.clear();
        console.log( `--------------------------------------------------------------------` );
        console.log( `--------------------------------------------------------------------` );
        console.log( "[ INFO ] O problema ja foi atendido." );
        console.log( `--------------------------------------------------------------------` );
        console.log( `--------------------------------------------------------------------\n\n\n` );
    }
}
