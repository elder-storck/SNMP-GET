//Todos os dados foram alterados antes de fazer commit

var snmp = require('snmp-native');

//1, 1, 1, 1, 1, 1, 1, 1, 1               //Oid get name interface
//1, 1, 1, 1, 1, 1, 1, 1, 1 10, 7        //The total number of octets transmitted out of the interface, including framing characters. 


let sessionConfig = {
  host: '192,128,0,10',
  port: 161,
  community: 'public',
  oid: [1, 1, 1, 1, 1, 1, 1, 1, 1 10, 7],
  //time: 11000,
}


//Inicia session SNMP
var session = new snmp.Session({ host: sessionConfig.host, port: sessionConfig.port, community: sessionConfig.community });


let octets1 = 0;  //Recebe get com quantidades de octetos
let octets2 = 0;  //Recebe get com quantidades de octetos
let pacotes = 0;  //quantidade de pacotes que passa na interface durante o tempo;


function callback1(error, varbinds){
  if (error) {
    console.error( 'Failed' );
  } else {
    octets1 = varbinds[0].value;        //Octetos1
    console.log(octets1);
  }
}
function callback2(error, varbinds){
  if (error) {
    console.error( 'Failed' );
  } else {
    octets2 = varbinds[0].value;        //Octetos2
    console.log(octets2);
  }
}

session.get({ oid: sessionConfig.oid }, callback1);     //Get The total number of octets transmitted out of the interface, including framing characters

setTimeout(() => {
  session.get({ oid: sessionConfig.oid }, callback2);   //Get The total number of octets transmitted out of the interface, including framing characters
}, 11000);

setTimeout(() => {
  console.log((octets2-octets1)*8);                     //The total number of octets transmitted out of the interface
  session.close();
}, 13000);
