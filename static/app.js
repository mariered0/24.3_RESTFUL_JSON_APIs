
const BASE_URL = "http://127.0.0.1:5000/api";

function generateCupcakeHTML(cupcake) {
    return `<div data-cupcake-id=${cupcake.id}>
    <li>
    ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating} <button class="delete-button">x</button>
    </li>
    <img class="cupcake-img" src="${cupcake.image}"
    alt="(no image provided)">
    </div>
    `;
}

// Put initial cupcakes on page.
async function showInitialCupcakes(){
    const response = await axios.get(`${BASE_URL}/cupcakes`);
    console.log('response.data', response.data)

    for (let cupcakeData of response.data.cupcakes){
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $("#cupcake-list").append(newCupcake);
    }
}

//handle form for adding of new cupcakes
$("#submit-btn").on("click", async function (evt) {
    evt.preventDefault();
  
    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();

    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
      flavor,
      rating,
      size,
      image
    });
  
    let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
    $("#cupcake-list").append(newCupcake);

    // this is to clear the form
    $("#cupcake-form").trigger("reset");
  });
  
  
  //handle clicking delete: delete cupcake
  
  $("#cupcake-list").on("click", ".delete-button", async function (evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
  
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
  });
  
  
  $(showInitialCupcakes);
