const d=document,
w=window;

async function showJuegos(){
    let $showGames=document.querySelector("#show-games");
    let   $loader=d.querySelector("#loader");
    $loader.style.display="block";
    
    
    let games=await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"),
    json=await games.json();
    
     console.log(json);
     
     if(!games.ok) throw {status:res.status, statusText: res.statusText};
     for(let i=0;i<json.length;i++){
     try{


       let game=json[i];
       console.log(game);
       console.log(game.title);
            
            $showGames.innerHTML+=`
            <div id="games">
            <div class="card">
            <h4> <b>${game.title}</b></h4>
            <img src="${game.thumb}" alt="${game.thumb}">
            <ul class="list">
            <li><b>Título: </b>${game.title}.</li>
            <li><b>ID del juego: </b>${game.gameID}.</li> 
            <li><b>Precio: </b>${game.normalPrice}.</li>
            <li><b>Puntuación: </b>${game.steamRatingPercent}%.</li>
            <li><b>Valoración: </b>${game.steamRatingText}.</li>
            
            
            </ul>
            <br>
            <a href="https://www.cheapshark.com/search#q:${game.title}" class="clickGame"target="_blank">Ir al juego</a>
            <a href="https://www.youtube.com/results?search_query=${game.title}" class="clickGame" target="_blank">Ver vídeo</a>
            
            </div>
            </div>
            `;
            
            
            
        
    
        

    }catch(err){
        let message= err.statusText || "No se ha podido cargar el contenido";
        $showGames.innerHTML=`<p id="error"><b>Error ${err.status}. ${message}.</b></p>`;

    }


     }


}


async function getJuegos(){

    let $contentSection=d.querySelector("#content-section");
    let $juegos=d.querySelector("#categories"),
    $submit=d.querySelector("#submit"),
    $loader=d.querySelector("#loader");
    $loader.style.display="block";
    let res=await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15"),
   json=await res.json();

    //console.log(json);
    
    if(!res.ok) throw {status:res.status, statusText: res.statusText};

    try{

        
        json.forEach(el => {

            $juegos.innerHTML+=`<option value=${el.title}>${el.title}</option>`;


            
        });
         
        $loader.style.display="none";
    }catch(err){

        let message= err.statusText || "No se ha podido cargar el contenido";
        $contentSection.innerHTML=`Error ${err.status} ${message}`;

    }

    $submit.addEventListener("click", async e=>{
        let $games=d.querySelector("#show-games"),
        $loader=d.querySelector("#loader");
        $games.style.display="none";

        $loader.style.display="block"
      
       
        let res= await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${$juegos.value}&upperPrice=15`),
        json=await res.json();

       
        console.log(json);
        $loader.style.display="none";
        if(!res.ok) throw {status:res.status, statusText: res.statusText};

        try{



            json.forEach(el=>{
                $contentSection.innerHTML=`
                <div id="cards">
                <div class="card">
                <h3>Información sobre el juego:</h3>
                <img src="${el.thumb}" id="img-game" alt="${el.title}">

                <ul id="list">
                <li><b>Título:</b> ${el.title}.</li>
                <li><b>ID del juego:</b> ${el.gameID}.</li>
                <li><b>Precio</b> ${el.normalPrice}.</li>
                <li><b>Puntuación: </b> ${el.steamRatingPercent}%.</li>
                <li><b>Valoración: </b> ${el.steamRatingText}.</li>
               
                
                
                
                </ul>
                <br>
                <a href="https://www.cheapshark.com/search#q:${el.title}" class="clickGame"target="_blank">Ir al juego</a>
                <a href="https://www.youtube.com/results?search_query=${el.title}" class="clickGame" target="_blank">Ver vídeo</a>

                <button id="cerrar" value="Cerrar">Cerrar</button>
              
              
              
              </div>
              </div>
              `;
                
                
                
            })
                
    let $button=d.querySelector("#cerrar");
    
    $button.addEventListener("click", e=>{

        $showGames=d.querySelector("#show-games");
       
        $showGames.style.display="flex";
        
       
     
      let  $card=d.querySelector("#cards");

        $card.style.display="none";


    })


            $loader.style.display="none";


        }catch(err){
            let message= err.statusText || "No se ha encontrado ningún juego";
            $contentSection.innerHTML=`Error ${err.status} ${message}`;

        }

    })


    
}






showJuegos();
getJuegos();