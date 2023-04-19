//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 10;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;


function setup()
{
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();

  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");

  // Modificar/completar
  casillerosSinDescubrir = COLUMNAS * FILAS;
  ponerMinasTablero();
}


function draw() {
  if (hizoClick == true)
  {
    if(mouseButton == LEFT){
      if(tieneMinaCasillero(columnaPresionada, filaPresionada)){
        perder();
      }
      else{
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); //pinta el casillero clickeado. Modificar/completar
        descubrirCasillero(columnaPresionada, filaPresionada);
        
    
      }
      if(ganoElJuego() == true){
        ganar();
      }
    }
    if(mouseButton == RIGHT){
      pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
    }
    
    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
  
}


function ganoElJuego()
{
  if(casillerosSinDescubrir == CANTIDAD_MINAS){
    return true; 
  }
  else{
    return false;
  }
    //Esto hace que NUNCA gane el juego. Modificar/completar
}

function ponerMinasTablero()
{
  let minas = 0;
  while(minas < CANTIDAD_MINAS){
    let numeroRandomCol = Math.floor(Math.random() * COLUMNAS);
    let numeroRandomFil = Math.floor(Math.random() * FILAS);
    if(!tieneMinaCasillero(numeroRandomCol, numeroRandomFil)){
      minas ++;
      ponerMinaCasillero(numeroRandomCol, numeroRandomFil);
    }
  }
}

function mostrarMinas()
{
  for(let col = 0; col < COLUMNAS; col++){
    for(let fil = 0; fil < FILAS; fil++){
      if(tieneMinaCasillero(col, fil)){
        pintarCasillero(col, fil, COLOR_CASILLERO_CON_MINA);
      }
    }
  }
}

function contarMinasAlrededor(columna, fila)
{
  let arr1 = [-1,0,1,1,1,0,-1,-1];
  let arr2 = [-1,-1,-1,0,1,1,1,0];
  let cont = 0;
  for(let i = 0; i < 8 ;i++){
    if (tieneMinaCasillero(columna+ arr1[i], fila+arr2[i])){
      cont++;
    }
  }
  return cont;
}