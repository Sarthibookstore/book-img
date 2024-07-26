


$(document).ready(function () {
    // Show loading pop-up
    $('#loading-popup').show();

    // $.get("https://script.google.com/macros/s/AKfycby4T4HbKFv4JhguzdRwtkUsyEO7yvKFpyBZiP9rEvlAMNi8YnFXg5XE3LyIdG1C0C8orA/exec", function (data) {
    $.get("https://script.google.com/macros/s/AKfycbxbPRv3Jrdbf3VPZIAXM_4MF1YVvt_kXkMxZyHuf7PCQpllEqS5e9hi0UYcGoPzIb41HA/exec", function (data) {
        // Set the retrieved URL as the src attribute of the img tag
        var imageUrl = String(data);
        console.log("hii", imageUrl);
        $('#paycode').attr('src', imageUrl);

        // Hide loading pop-up once image is loaded
        $('#loading-popup').hide();
    });
});

function openPopup(message) {
    document.getElementById("confirmation-message").innerText = message;
    document.getElementById("custom-popup").style.display = "block";
}

function closePopup() {
    document.getElementById("custom-popup").style.display = "none";
    // document.getElementById("heading").innerHTML = "Saving Your Data Please Wait...";
}

function submitForm() {
    // Add your form submission logic here
    // document.getElementById("custom-popup").style.display = "none";




    let fullname = document.getElementById('name').value;
    let address = document.getElementById('Address').value;
    let contactdetails = document.getElementById('ContactDetails').value;
    let alternativecontactdetails = document.getElementById('AlternativeContactDetails').value;
    let upiid = document.getElementById('UPIID').value;
    let transactionid = document.getElementById('TransactionID').value;

    if (fullname !== '' && address !== '' && contactdetails !== '' && alternativecontactdetails !== '' && upiid !== '' && transactionid !== '') {
        document.getElementById("heading").innerHTML = "Saving Your Data Please Wait...";
        document.getElementById("confirm-btn").style.display = "none";
        document.getElementById("cancel-btn").style.display = "none";
    } else {
        alert("Please Fill All Fields");
    }

    console.log(fullname);
    console.log(address);
    console.log(contactdetails);
    console.log(alternativecontactdetails);
    console.log(upiid);
    console.log(transactionid);

    $.ajax({
        // url: 'https://script.google.com/macros/s/AKfycbzwQqbuHmlz4-L0bP1-qZQNI79SI0WF48jSd4XFyJGhgo3mdzMEi8nFV7xUM462w0upew/exec',
        url: 'https://script.google.com/macros/s/AKfycbwGurVPQrOmrfgRD_vPgmo-_LkMJrpWCs8US5OIAYPdyoKpt8GVBYwQhseIeN9FoVTh7g/exec',
        type: 'post',
        data: {
            'fullname': fullname,
            'address': address,
            'contactdetails': contactdetails,
            'alternativecontactdetails': alternativecontactdetails,
            'upiid': upiid,
            'transactionid': transactionid
        },
        success: function (result) {
            // Handle success if needed
            // console.log(JSON.stringify(result));
            console.log(result);

            if (fullname === result) {
                // alert("data saved successfully!!");
                document.getElementById("heading").innerHTML = "Data Saved successfully Close Window";
                // document.getElementById("popup-content").style.display = "none";

                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
            else {
                alert("data not saved successfully!!");
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        },
    });

}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#form");
    const button = document.querySelector("#formbutton");

    button.addEventListener("click", (event) => {
        event.preventDefault();

        let fullname = document.getElementById('name').value;
        let address = document.getElementById('Address').value;
        let contactdetails = document.getElementById('ContactDetails').value;
        let alternativecontactdetails = document.getElementById('AlternativeContactDetails').value;
        let upiid = document.getElementById('UPIID').value;
        let transactionid = document.getElementById('TransactionID').value;

        // Construct the message to display in the confirmation popup
        const confirmationMessage = `Full Name: ${fullname}\nAddress: ${address}\nContact Details: ${contactdetails}\nAlternative Contact Details: ${alternativecontactdetails}\nUPI ID: ${upiid}\nTransaction ID: ${transactionid}`;
        if (fullname !== '' && address !== '' && contactdetails !== '' && alternativecontactdetails !== '' && upiid !== '' && transactionid !== '') {

            // Show confirmation popup
            openPopup(confirmationMessage);
        }
        else {
            alert("Please Fill All Fields");
        }
    });
});
