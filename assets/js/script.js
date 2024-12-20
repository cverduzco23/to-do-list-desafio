const list = document.getElementById("lista");
const input = document.getElementById("input-tarea");
const btnAgregar = document.getElementById("boton-agregar");
const totalTareas = document.getElementById("cantidad-total");
const tareaRealizadas = document.getElementById("cantidad-realizadas");
const tareaPendientes = document.getElementById("cantidad-pendientes");

let listaTareas = [
  { id: 1, descripcion: "Pasear a Bruno", completada: false },
  { id: 2, descripcion: "Empezar proyecto escolar", completada: false },
  { id: 3, descripcion: "Llamar al médico", completada: false },
];

const crearLista = () => {
  list.innerHTML = "";
  for (tarea of listaTareas) {
    list.innerHTML += `
      <tr data-id="${tarea.id}">
        <td>${tarea.id}</td>
        <td class="descripcion" style="text-decoration: ${
          tarea.completada ? "line-through" : "none"
        }">${tarea.descripcion}</td>
        <td>
          <input type="checkbox" class="checkbox" data-id="${tarea.id}" ${
      tarea.completada ? "checked" : ""
    }>
        </td>
        <td class="eliminar" data-id="${tarea.id}">X</td>
      </tr>`;
  }

  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const id = parseInt(e.target.dataset.id);
      completarTarea(id);
      actualizarContadores();
    });
  });

  const botonesEliminar = document.querySelectorAll(".eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      eliminarTarea(id);
    });
  });
};

const completarTarea = (id) => {
  let tarea = listaTareas.find((tarea) => tarea.id === id);

  if (tarea) {
    tarea.completada = !tarea.completada;
    const fila = document.querySelector(`tr[data-id="${id}"]`);
    const descripcion = fila.querySelector(".descripcion");

    if (tarea.completada) {
      descripcion.style.textDecoration = "line-through";
    } else {
      descripcion.style.textDecoration = "none";
    }
  }
};

const actualizarContadores = () => {
  totalTareas.textContent = listaTareas.length;
  tareaRealizadas.textContent = listaTareas.filter(
    (tarea) => tarea.completada
  ).length;
  tareaPendientes.textContent = listaTareas.filter(
    (tarea) => tarea.completada == false
  ).length;
};

btnAgregar.addEventListener("click", () => {
  if (input.value !== "") {
    const nuevaTarea = {
      id:
        listaTareas.length > 0 ? listaTareas[listaTareas.length - 1].id + 1 : 1,
      descripcion: input.value,
      completada: false,
    };
    listaTareas.push(nuevaTarea);
    input.value = "";
    crearLista();
    actualizarContadores();
  } else {
    alert("Escribe una tarea.");
  }
});

input.addEventListener("keydown", (key) => {
  if (key.key === "Enter") {
    if (input.value !== "") {
      const nuevaTarea = {
        id:
          listaTareas.length > 0
            ? listaTareas[listaTareas.length - 1].id + 1
            : 1,
        descripcion: input.value,
        completada: false,
      };
      listaTareas.push(nuevaTarea);
      input.value = "";
      crearLista();
      actualizarContadores();
    } else {
      alert("Escribe una tarea.");
    }
  }
});

const eliminarTarea = (id) => {
  listaTareas = listaTareas.filter((tarea) => tarea.id !== id);
  crearLista();
  actualizarContadores();
};

crearLista();
actualizarContadores();
