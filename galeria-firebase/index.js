/* global firebase */
// Initialize Firebase
let config = {
  apiKey: 'AIzaSyCGQvJrcWt8bQ7wB3A2AXqkHqld-NYAVJw',
  authDomain: 'social-network-967b3.firebaseapp.com',
  databaseURL: 'https://social-network-967b3.firebaseio.com',
  projectId: 'social-network-967b3',
  storageBucket: 'social-network-967b3.appspot.com',
  messagingSenderId: '25029310975'
};
firebase.initializeApp(config);
let TablaDeBaseDatos = firebase.database().ref('pictures');


const redimensionar = (srcData, width, height) => {
  let imageObj = new Image();
  imageObj.src = srcData;
  let canvas = document.createElement('canvas');
  let canvasGetContext = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  let xStart = 0;
  let yStart = 0;
  let aspectRadio = imageObj.height / imageObj.width;
  let newWidth;
  let newHeight;
  if (imageObj.height < imageObj.width) {
    aspectRadio = imageObj.width / imageObj.height;
    newHeight = height;
    newWidth = aspectRadio * height;
    xStart = -(newWidth - width) / 2;
  } else {
    newWidth = width,
      newHeight = aspectRadio * width;
    yStart = -(newHeight - height) / 2;
  }
  canvasGetContext.drawImage(imageObj, xStart, yStart, newWidth, newHeight);

  return canvas.toDataURL('image/jpeg', 0.75);
}



  document.getElementById('upload-file-selector').addEventListener('change', () => {
    let fileSelector = document.getElementById('upload-file-selector');
    if (fileSelector.files && fileSelector.files[0]) {
      let archivo = new FileReader();
      archivo.onload = (event) => {
        let img = redimensionar(event.target.result, 300, 300);
        let imgLarge = redimensionar(event.target.result, 590, 590);
        TablaDeBaseDatos.push({
          urlLarge: imgLarge,
          url: img
        });
        // visualizar la imagen en la etiqueta img 
        document.getElementById('img').setAttribute('src', img);
      };
      archivo.readAsDataURL(fileSelector.files[0]);
    }
  });



function remove(keyImagen) {
  TablaDeBaseDatos.child(keyImagen).remove();
};

TablaDeBaseDatos.on('value', (snapshot) => {
  document.getElementById('divImagenes').innerHTML = '';
  snapshot.forEach(element => {
    if (element.val().url) {
      document.getElementById('divImagenes').innerHTML += `
      <div>
      <img src="${redimensionar(element.val().url, 300, 300)}"/>
      <br/>
      <button id="${element.key}" onclick="remove('${element.key}')">Borrar</button>
      </div>`;
    }

  });
})
