document.addEventListener("DOMContentLoaded", () => {
    const botonBuscar = document.getElementById("btnBuscar");

    botonBuscar.addEventListener("click", () => {
        const searchQuery = document.getElementById("inputBuscar").value;
        const contenedor = document.getElementById("contenedor");

        if (searchQuery === "") {
            contenedor.innerHTML = ""; // Limpiar el contenedor si no hay búsqueda
            return;
        }

        const URL = `https://images-api.nasa.gov/search?q=${searchQuery}`;

        fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }
                return response.json();
            })
            .then(data => {
                const items = data.collection.items;
                contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos resultados

                items.forEach(item => {
                    const { title, description, date_created } = item.data[0];
                    const img = item.links && item.links.length > 0 ? item.links[0].href : null;
                    const dateObj = new Date(date_created);
                    const formattedDate = dateObj.toLocaleDateString();

                    const htmlContentToAppend = `
                        <div class="col-md-3 col-sm-4 col-6 mb-3">
                            <div class="card custom-card">
                                ${img ? `<img src="${img}" class="card-img-top" alt="${title}">` : ""}
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${description || "Sin descripción"}</p>
                                    <p class="card-text"><small class="text-body-secondary">${formattedDate}</small></p>
                                </div>
                            </div>
                        </div> 
                    `;
                    contenedor.innerHTML += htmlContentToAppend;
                });
            })
            .catch(error => {
                console.error("Error en la petición:", error);
                contenedor.innerHTML = '<p>Ocurrió un error al realizar la búsqueda.</p>';
            });
    });
});
