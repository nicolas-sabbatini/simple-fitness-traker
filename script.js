let currentRepsFromDay, lastVisit, flecciones, sentadillas, abdominales;

const loadData = () => {
  currentRepsFromDay = localStorage.getItem("currentRepsFromDay");
  lastVisit = localStorage.getItem("lastVisit");
  flecciones = localStorage.getItem("flecciones");
  sentadillas = localStorage.getItem("sentadillas");
  abdominales = localStorage.getItem("abdominales");
};

const saveData = () => {
  localStorage.setItem("currentRepsFromDay", currentRepsFromDay);
  localStorage.setItem("lastVisit", lastVisit);
  localStorage.setItem("flecciones", flecciones);
  localStorage.setItem("sentadillas", sentadillas);
  localStorage.setItem("abdominales", abdominales);
};

const clearData = () => {
  lastVisit = new Date();
  flecciones = 0;
  sentadillas = 0;
  abdominales = 0;
};

const updateReps = () => {
  const reps = document.querySelector("sl-input");
  if (!!reps.valueAsNumber) {
    currentRepsFromDay = reps.valueAsNumber;
    clearData();
    saveData();
  }
};

const updateDay = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const last = new Date(lastVisit);
  if (
    last.getDate() === yesterday.getDate() &&
    last.getMonth() === yesterday.getMonth() &&
    last.getFullYear() === yesterday.getFullYear()
  ) {
    currentRepsFromDay++;
    clearData();
    saveData();
  }
};

const updateUi = () => {
  const info = document.querySelector("#info");
  info.innerHTML = `Estas en el día: ${currentRepsFromDay}`;
  const flec = document.querySelector("#flecciones");
  flec.innerHTML = `${currentRepsFromDay}/${flecciones}`;
  const sent = document.querySelector("#sentadillas");
  sent.innerHTML = `${currentRepsFromDay}/${sentadillas}`;
  const abd = document.querySelector("#abdominales");
  abd.innerHTML = `${currentRepsFromDay}/${abdominales}`;
};

// Botones de configuración
const config = document.querySelector("#config");
const openRepButton = document.querySelector("#info");
openRepButton.addEventListener("click", () => config.show());
const closeRepButton = document.querySelector("#config-close");
closeRepButton.addEventListener("click", () => {
  updateReps();
  updateUi();
  config.hide();
});

// Botones de flecciones
const fleccionesButton = document.querySelector("#flecciones-btn");
fleccionesButton.addEventListener("click", () => {
  flecciones++;
  saveData();
  updateUi();
});

// Botones de sentadillas
const sentadillasButton = document.querySelector("#sentadillas-btn");
sentadillasButton.addEventListener("click", () => {
  sentadillas++;
  saveData();
  updateUi();
});

// Botones de abdominales
const abdominalesButton = document.querySelector("#abdominales-btn");
abdominalesButton.addEventListener("click", () => {
  abdominales++;
  saveData();
  updateUi();
});

// <<<<<<<<< Inicio del codigo >>>>>>>>> //
// Cargamos la información
loadData();

// Si el usuario nunca entro al sitio, seteamos el valor de las repeticiones
if (!currentRepsFromDay) {
  currentRepsFromDay = 1;
  clearData();
  saveData();
}
// Actualizamos el valor de las repeticiones
updateDay();

// Actualizamos la ui
updateUi();
