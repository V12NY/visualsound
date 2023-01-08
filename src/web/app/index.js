//funcion definida para cargar el modelo entrenado
(async() => {
    console.log("Cargando modelo...");
    modelo = await tf.loadLayersModel("/model.json");
    console.log("Modelo cargado");
  })();
  
  
  //funcion para captar el sonido del microfono
  const displayBars = async (sampleRate) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate
      });
      //solo se necesita el audio
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      const mediaStreamSource = audioContext.createMediaStreamSource(mediaStream);
      //se utiliza la libreria analyser para defenir las opciones
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = 200;  
      const dataArray = new Float32Array(bufferLength);
      mediaStreamSource.connect(analyser);
  
 
// Obtén una referencia al elemento canvas y su contexto 2D
const ctx = document.getElementById('myChart').getContext('2d');

const values = [];

// Define los datos y la configuración de la gráfica
const data = {
  labels: new Array(30).fill().map((_,i)=>i*12),
  datasets: [{
    label: 'VisualSond',
    data: values,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1
  }]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scale: {
    ticks: {
      beginAtZero: true,
      display: false
    }
  }
};

// Crea una nueva instancia de la gráfica de radar y proporciona los datos y la configuración
const chart = new Chart(ctx, {
  type: 'radar',
  data: data,
  options: options
});

// Actualiza la gráfica cada 20 milisegundos
setInterval(function() {
  chart.data.datasets[0].data = getNewValues();
  chart.update();
}, 20);
// Esta función devuelve un nuevo conjunto de valores para actualizar la gráfica
function getNewValues() {
  analyser.getFloatFrequencyData(dataArray);
  var tensor =  tf.tensor(dataArray);
  return modelo.predict(tf.reshape(tensor,[1,200,1])).dataSync();
  
}
    };
    
    setTimeout(function () {
      document
        .querySelector("#button-start-8-id")
        .addEventListener("click", function () {
          this.style.display = "none";
          displayBars(8000);
        });
    }, 15);