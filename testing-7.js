$(document).ready(function () {
  // Show loading pop-up
  $("#loading-popup").show();

  $.get(
    "https://script.google.com/macros/s/AKfycbzJUjvNdpQw7ZKgFAqPomGkI5Xy0Ngbswr2mAgoydfr98FGk2A3euDXSxz6S1YJ0Q/exec",
    function (data) {
      var imageUrl = String(data);
      console.log("Image URL:", imageUrl);
      $("#paycode").attr("src", imageUrl);

      // Hide loading pop-up once image is loaded
      $("#loading-popup").hide();
    }
  );
});

function openPopup(message) {
  document.getElementById("confirmation-message").innerText = message;
  document.getElementById("custom-popup").style.display = "block";
}

function closePopup() {
  document.getElementById("custom-popup").style.display = "none";
}

function submitForm() {
  // Collect form data
  let fullname = document.getElementById("name").value;
  let address = document.getElementById("Address").value;
  let contactdetails = document.getElementById("ContactDetails").value;
  let alternativecontactdetails = document.getElementById(
    "AlternativeContactDetails"
  ).value;
  let upiid = document.getElementById("UPIID").value;
  let transactionid = document.getElementById("TransactionID").value;
  let image = document.getElementById("imageUpload").files[0]; // Get the uploaded file

  if (
    fullname !== "" &&
    address !== "" &&
    contactdetails !== "" &&
    alternativecontactdetails !== "" &&
    upiid !== "" &&
    transactionid !== "" &&
    image
  ) {
    document.getElementById("heading").innerHTML =
      "Saving Your Data Please Wait...";
    document.getElementById("confirm-btn").style.display = "none";
    document.getElementById("cancel-btn").style.display = "none";

    // Construct FormData
    var formData = new FormData();
    formData.append("fullname", fullname); // Note: Updated keys
    formData.append("address", address);
    formData.append("contactdetails", contactdetails);
    formData.append("alternativecontactdetails", alternativecontactdetails);
    formData.append("upiid", upiid);
    formData.append("transactionid", transactionid);
    formData.append("image", image); // Append the image file

    // Log FormData to check
    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbwhjKexWIUxiyxesENDDL00O5CdmBfwqMxRiacOEaoxNlJ3hr2qOjfzFI-dKkPoL2OdoA/exec",
      type: "post",
      data: formData,
      contentType: false, // Tell jQuery not to set contentType
      processData: false, // Tell jQuery not to process the data
      success: function (result) {
        console.log("Success:", result);

        // Check if response matches expected result
        if (result.trim() === fullname) {
          document.getElementById("heading").innerHTML =
            "Data Saved successfully! Close Window";
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          alert("Data not saved successfully!");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
        console.log("XHR:", xhr);
        console.log("Status:", status);
      },
    });
  } else {
    alert("Please Fill All Fields and Select an Image");
  }
}

// Add event listener to the submit button
document.getElementById("formbutton").addEventListener("click", submitForm);

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("#formbutton");

  button.addEventListener("click", (event) => {
    event.preventDefault();

    let fullname = document.getElementById("name").value;
    let address = document.getElementById("Address").value;
    let contactdetails = document.getElementById("ContactDetails").value;
    let alternativecontactdetails = document.getElementById(
      "AlternativeContactDetails"
    ).value;
    let upiid = document.getElementById("UPIID").value;
    let transactionid = document.getElementById("TransactionID").value;

    const confirmationMessage = `Full Name: ${fullname}\nAddress: ${address}\nContact Details: ${contactdetails}\nAlternative Contact Details: ${alternativecontactdetails}\nUPI ID: ${upiid}\nTransaction ID: ${transactionid}`;

    if (
      fullname !== "" &&
      address !== "" &&
      contactdetails !== "" &&
      alternativecontactdetails !== "" &&
      upiid !== "" &&
      transactionid !== ""
    ) {
      openPopup(confirmationMessage);
    } else {
      alert("Please Fill All Fields");
    }
  });
});
