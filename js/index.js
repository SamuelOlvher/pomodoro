//Estilos
document.body.style.backgroundImage='url(public/backgrounds/' + Math.floor((Math.random() * 37) + 1) + '.jpg)';
contenedor=document.getElementsByClassName('contenedor');
contenedor[0].style.height=(screen.height*0.795) + 'px';
contenToDo=document.getElementsByClassName('contenToDo');
contenToDo[0].style.height=(screen.height*0.4) + 'px';
contenToDo[1].style.height=(screen.height*0.4) + 'px';

function changeFondo(){
  document.body.style.backgroundImage='url(public/backgrounds/' + Math.floor((Math.random() * 37) + 1) + '.jpg)';
}
//Variales globales
todo=[];




//SCRIPT DE LOS TABS
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

function openMedia(evt, nameTab) {
  var i, tabcontent, tablinks, tabMediaSuperior;
  tabcontent = document.getElementsByClassName("contenTabMedia");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tabMediaSuperior = document.getElementsByClassName("contenTabMediaSuperior");
  for (i = 0; i < tabMediaSuperior.length; i++) {
    tabMediaSuperior[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tabName");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(nameTab).style.display = "block";
  evt.currentTarget.className += " active";
  document.getElementById(nameTab + 'Superior').style.display = "block";
}
function openTasks(evt, nameTab) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("contenToDo");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tabToDo");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(nameTab).style.display = "block";
  evt.currentTarget.className += " active";
}

//SCRIPT de cambio de video/directo/playlist
function changeMedia(plataforma, urlMedia) {
  switch (plataforma) {
    case 'youtube':
      //tratamiento URL
      urlMedia=urlMedia.slice(8);
      urlSeccionado=urlMedia.split('/');
      urlVerify=urlSeccionado[1].split('?');
      if(urlVerify[0] === urlSeccionado[1]){
        IDVideo=urlVerify[0];
      }else{
        urlSeparado=urlVerify[1].split('&');
        IDVideo=urlSeparado[0].slice(2);
      }
      console.log(IDVideo);
      //incrustacion y cambio de video
      urlFull='<iframe width="100%" height="315" src="https://www.youtube.com/embed/' + IDVideo + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      console.log(urlFull);
      divYT=document.getElementById('youtubeSuperior');
      divYT.innerHTML=urlFull;
      break;
    case 'spotify':
      //tratamiento URL
      urlMedia=urlMedia.slice(34);
      urlSeccionado=urlMedia.split('?');
      IDPlaylist=urlSeccionado[0];
      console.log(IDPlaylist);
      //incrustacion y cambio de playlist
      urlFull='<iframe src="https://open.spotify.com/embed/playlist/' + IDPlaylist + '" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
      console.log(urlFull);
      divYT=document.getElementById('spotifySuperior');
      divYT.innerHTML=urlFull;
      break;
    case 'twitch':
      //tratamiento URL
      urlMedia=urlMedia.slice(23);
      urlSeccionado=urlMedia.split('/');
      if(urlSeccionado.length == 1){
        urlFull='<iframe src="https://player.twitch.tv/?channel=' + urlSeccionado[0] + '&parent=www.example.com" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="100%"></iframe>';
      }else{
        urlFull='<iframe src="https://player.twitch.tv/?video=' + urlSeccionado[1] + '&parent=www.example.com" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="100%"></iframe>'
      }
      console.log(urlSeccionado);
      console.log(urlFull);
      divYT=document.getElementById('twitchSuperior');
      divYT.innerHTML=urlFull;
      break;
    default:
      break;
  }
  
}
//Script de exportar a CSV
function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }

      str += line + '\r\n';
  }

  return str;
}

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
      items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = this.convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}
function exportarCSV(arreglo){
  var headers = {
    ID_task: 'ID_task',
    nombre: 'Nombre Tarea'.replace(/,/g, ''), // remove commas to avoid errors
    pomodoros: "Pomodoros",
    vencimiento: "Vencimiento",
    estatus: "Estatus"
  };
  
  var itemsFormatted = [];
    
  // format the data
  arreglo.forEach((item) => {
      itemsFormatted.push({
          ID_task: item.ID_task,
          nombre: item.nombre.replace(/,/g, ''), // remove commas to avoid errors,
          pomodoros: item.pomodoros,
          vencimiento: item.vencimiento,
          estatus: item.estatus
      });
  });
  exportCSVFile(headers,itemsFormatted,"exportTo-Do");
}
//Scripts de ToDo
function addTask(arreglo,nameTask,pomos,venci){
  contenedor=document.getElementById('proceso');
  id_tarea=guid();
  arreglo.push({
    ID_task: id_tarea,
    nombre: nameTask,
    pomodoros: '0 / ' + pomos,
    vencimiento: venci,
    estatus: "en proceso"
  });
  esqueletoTask=`
  <p class="titleTask">` + nameTask + `</p>
  <p class="dataTask">Pomodoros: <span id="pomos-` + id_tarea + `">0 / ` + pomos + `</span></p>
  <p class="dataTask">Entrega: <span id="vencimiento">` + venci + `</span></p>
  <div class="gridBotones">
      <button onclick="completeTask(todo,'` + id_tarea + `')"><span class="material-icons">done</span> Completada</button>
      <button onclick="editTask(todo,'` + id_tarea + `')"><span class="material-icons">edit</span> Editar</button>
      <button onclick="deleteTask(todo,'` + id_tarea + `')"><span class="material-icons">clear</span> Eliminar</button>
  </div>
  <button class="startPomoTask" onclick="StartPomodoro('` + id_tarea + `')"><span class="material-icons">play_arrow</span> Iniciar Pomodoro</button>
  `;
  divTask=document.createElement("div");
  divTask.innerHTML=esqueletoTask;
  divTask.setAttribute("id",id_tarea);
  divTask.setAttribute("class","task");
  contenedor.appendChild(divTask);
  
  
}
function deleteTask(arreglo,ID_task){
  indice=SearchID_task(arreglo,ID_task);
  arreglo.splice(indice,1);
  divElement = document.getElementById(ID_task);	
	if (!divElement){
		alert("La tarea selecionada no existe");
	} else {
		padre = divElement.parentNode;
		padre.removeChild(divElement);
	}
}
function SaveChangesTask(arreglo,ID_task,nameTask,pomos,venci) {
  indice=SearchID_task(arreglo,ID_task);
  arreglo[indice]["nombre"]=nameTask;
  arreglo[indice]["pomodoros"]=arreglo[indice]["pomodoros"].slice(0,-4) + ' / ' + pomos;
  arreglo[indice]["vencimiento"]=venci;
  closeModal();
  //Eliminando tarea obsoleta
  divElement = document.getElementById(ID_task);	
	if (!divElement){
		alert("La tarea selecionada no existe");
	} else {
		padre = divElement.parentNode;
		padre.removeChild(divElement);
	}
  //Añadiendo tarea modificada
  contenedor=document.getElementById('proceso');
  esqueletoTask=`
  <p class="titleTask">` + arreglo[indice]["nombre"] + `</p>
  <p class="dataTask">Pomodoros: <span id="pomos-` + ID_task + `">` + arreglo[indice]["pomodoros"] + `</span></p>
  <p class="dataTask">Entrega: <span id="vencimiento">` + arreglo[indice]["vencimiento"] + `</span></p>
  <div class="gridBotones">
      <button onclick="completeTask(todo,'` + ID_task + `')"><span class="material-icons">done</span> Completada</button>
      <button onclick="editTask(todo,'` + ID_task + `')"><span class="material-icons">edit</span> Editar</button>
      <button onclick="deleteTask(todo,'` + ID_task + `')"><span class="material-icons">clear</span> Eliminar</button>
  </div>
  <button class="startPomoTask" onclick="StartPomodoro('` + ID_task + `')"><span class="material-icons">play_arrow</span> Iniciar Pomodoro</button>
  `;
  divTask=document.createElement("div");
  divTask.innerHTML=esqueletoTask;
  divTask.setAttribute("id",ID_task);
  divTask.setAttribute("class","task");
  contenedor.appendChild(divTask);
}
function completeTask(arreglo,ID_task){
  indice=SearchID_task(arreglo,ID_task);
  arreglo[indice]["estatus"]='Completado';
  //eliminar tarea de la seccion En proceso
  divElement = document.getElementById(ID_task);	
	if (!divElement){
		alert("La tarea selecionada no existe");
	} else {
		padre = divElement.parentNode;
		padre.removeChild(divElement);
	}
  //Creando tarea en la seccion de completado
  contenedor=document.getElementById('completado');
  esqueletoTask=`
  <p class="titleTask">` + arreglo[indice]["nombre"] + `</p>
  <p class="dataTask">Pomodoros: <span id="pomos">` + arreglo[indice]["pomodoros"] + `</span></p>
  <p class="dataTask">Entrega: <span id="vencimiento">` + arreglo[indice]["vencimiento"] + `</span></p><strong>Completado! c:</strong>`;
  divTask=document.createElement("div");
  divTask.innerHTML=esqueletoTask;
  divTask.setAttribute("id",ID_task);
  divTask.setAttribute("class","task");
  contenedor.appendChild(divTask);
}
function editTask(arreglo,ID_task){
  indice=SearchID_task(arreglo,ID_task);
  taskNameEdit=document.getElementById('taskNameEdit');
  taskPomosEdit=document.getElementById('taskPomosEdit');
  taskDateEdit=document.getElementById('taskDateEdit');
  botonSaveChanges=document.getElementById('botonSaveChanges');
  
  taskNameEdit.value=arreglo[indice]["nombre"];
  taskPomosEdit.value=arreglo[indice]["pomodoros"].slice(4);
  taskDateEdit.value=arreglo[indice]["vencimiento"];
  botonSaveChanges.innerHTML=`<input type="button" value="Guardar Cambios" class="addTaskBoton" onclick="SaveChangesTask(todo,'` + ID_task + `',document.getElementById('taskNameEdit').value,document.getElementById('taskPomosEdit').value,document.getElementById('taskDateEdit').value)">`;

  openModal();
}

//Modal
var modal = document.getElementById("tvesModal");
var body = document.getElementsByTagName("body")[0];

function openModal() {
  modal.style.display = "block";
  body.style.position = "static";
  body.style.height = "100%";
  body.style.overflow = "hidden";
}
function closeModal(){
  modal.style.display = "none";
  body.style.position = "inherit";
  body.style.height = "auto";
  body.style.overflow = "visible";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
  }
}

//Reloj
function tempoStart(minutosInput,segundosInput=59,ID_task="ninguna"){
  tiempoTotal=((minutosInput)*60)+segundosInput;
  tiempoLlevado=0;
  segsBack=segundosInput;
  minutesBack=minutosInput;
  inter=setInterval(function(){
      if(tiempoLlevado != tiempoTotal){
          if(segsBack < 1){
              if(minutesBack > 9){
                  document.getElementById("minutosBack").innerHTML=minutesBack;
              }else{
                  document.getElementById("minutosBack").innerHTML='0' + minutesBack;
              }
              
              minutesBack--;
              segsBack=59;
              document.getElementById("segundosBack").innerHTML="00";
          }else{
              if(minutesBack > 9){
                  document.getElementById("minutosBack").innerHTML=minutesBack;
              }else{
                  document.getElementById("minutosBack").innerHTML='0' + minutesBack;
              }
              
              if(segsBack > 9){
                  document.getElementById("segundosBack").innerHTML=segsBack--;
              }else{
                  document.getElementById("segundosBack").innerHTML='0' + segsBack--;
              }
              //document.getElementById("segundosBack").innerHTML=segsBack--;
          }
          lineaDefault=document.getElementById('lineaDefault');
          verde=(tiempoLlevado*100)/tiempoTotal;
          tiempoLlevado++;
          estilo='linear-gradient(90deg, rgba(1,147,124,1) ' + verde + '%, rgba(128,128,128,1) 1%)';
          lineaDefault.style.background=estilo;
      }else{
        lineaDefault=document.getElementById('lineaDefault');
        estilo='linear-gradient(90deg, rgba(1,147,124,1) 0%, rgba(128,128,128,1) 1%)';
          if(ID_task != "ninguna"){
            parar(ID_task);
            changeButtonsTempo('desactivado',ID_task);
            
          }else{
            parar();
            changeButtonsTempo('desactivado');
          }
          
      }
      botonKK=document.getElementById('botonKK');
      botonKK.addEventListener("click",clear);
      
      
  },1000,"JavaScript");
  
}
function timeout(){
  setTimeout(function(){
      document.getElementById("testdiv").innerHTML="Pasaron 2 segundos antes de que pudieras ver esto.";
  },2000,"JavaScript");
}
function clear(){
  botonBipolar=document.getElementById('botonBipolar');
  botonBipolar.innerHTML=`<button onclick="continuar()" class="pauseTempo"><span class="material-icons">play_arrow</span> Continuar</button>`;
  clearInterval(inter);
}
function continuar(){
  minutos=parseInt(document.getElementById('minutosBack').innerHTML);
  segundos=parseInt(document.getElementById('segundosBack').innerHTML);
  botonBipolar=document.getElementById('botonBipolar');
  botonBipolar.innerHTML=`<button class="pauseTempo" id="botonKK"><span class="material-icons">pause</span> Pausar</button>`;
  tempoStart(minutos,segundos);
}
function parar(ID_task="ninguna"){
  document.getElementById('minutosBack').innerHTML="00";
  document.getElementById('segundosBack').innerHTML="00";
  clearInterval(inter);
  if(ID_task == "ninguna"){
    taskOnProcess=document.getElementById('taskOnProcess');
    taskOnProcess.innerHTML="";
  }
  document.getElementById('botonStart').innerHTML=`<button class="startPomo" onclick="StartPomodoro()">Iniciar Pomodoro</button>`;
  document.getElementById('botonStart').setAttribute('class','botonStart');
  lineaDefault=document.getElementById('lineaDefault');
  estilo='linear-gradient(90deg, rgba(1,147,124,1) 0%, rgba(128,128,128,1) 1%)';
}
function changesOnTempo(minutos=25){
  minutos=parseInt(minutos);
  if(minutos > 9){
    document.getElementById('minutosBack').innerHTML=minutos;
  }else{
    document.getElementById('minutosBack').innerHTML='0' + minutos;
  }
}
function changeButtonsTempo(estatus='activado',ID_task="ninguna"){
  switch (estatus) {
    case 'activado':
      divbotonStart=document.getElementById('botonStart');
      divbotonStart.setAttribute('class','botonStart activadoBotones');
      esqueleto=`<div id="botonBipolar">
      <button class="pauseTempo" id="botonKK"><span class="material-icons">pause</span> Pausar</button>
      </div>
      <div><button class="stopTempo" onclick="parar()"><span class="material-icons">stop</span> Stop</button></div>`;
      divbotonStart.innerHTML=esqueleto;
      break;
    case 'desactivado':
      divbotonStart=document.getElementById('botonStart');
      divbotonStart.setAttribute('class','botonStart');
      if(ID_task != "ninguna"){
        //taskOnProcess=document.getElementById('taskOnProcess');
        //taskOnProcess.innerHTML="";
        esqueleto=`<button class="startPomo" onclick="StartPomodoro('` + ID_task +`')">Seguir con otro pomodoro</button>`;
      }else{
        esqueleto=`<button class="startPomo" onclick="StartPomodoro()">Iniciar Pomodoro</button>
        <button class="vincNewTask" onclick="document.getElementById('Paris').style.display='block'">Añadir nueva tarea</button>`;
      }
      divbotonStart.innerHTML=esqueleto;
      break;
  }

}
function StartPomodoro(ID_task="ninguna"){
  changeButtonsTempo();
  
  if(ID_task != "ninguna"){
    tempoStart(parseInt(document.getElementById('minutosElegidos').value) - 1,59,ID_task);
    indice=SearchID_task(todo,ID_task);
    todo[indice]["pomodoros"]=(parseInt(todo[indice]["pomodoros"].slice(0,-4)) + 1) + ' / ' + todo[indice]["pomodoros"].slice(4);
    taskOnProcess=document.getElementById('taskOnProcess');
    pomos=document.getElementById('pomos-' + ID_task);
    pomos.innerHTML=todo[indice]["pomodoros"];
    esqueleto=`<p style="margin: 0">Tarea en Proceso:</p>
    <div class="taskProcess">
        <h4 style="margin: 0">` + todo[indice]["nombre"] + `</h4>
        <div class="datosTaskProcess">
            <p style="margin: 0"><span class="material-icons">timer</span>` + todo[indice]["pomodoros"] + `</p>
            <p style="margin: 0"><span class="material-icons">today</span> ` + todo[indice]["vencimiento"] + `</p>
        </div>
    </div>`;
    taskOnProcess.innerHTML=esqueleto;
  }else{
    tempoStart(parseInt(document.getElementById('minutosElegidos').value) - 1);
  }
}

//Herramientas Generales
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}
function SearchID_task(arreglo,ID_task){
  for(a=0;a<arreglo.length; a++){
      if(arreglo[a]['ID_task'] === ID_task){
          return a;
      }
  }
}
