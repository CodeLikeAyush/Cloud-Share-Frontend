document.getElementById("fileUploadForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get the selected file from the input field
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (file) {
        // Create a FormData object and append the file to it
        const formData = new FormData();
        formData.append("file", file);

        // Make a Fetch request to send the file to the server
        try {
            const img = document.querySelector('.icon-container img');
            img.classList.add('upload_animation_class');
            const response = await fetch("http://localhost:8000/api/files/upload", {
                method: "POST",
                body: formData,
            });
            const { file_name, file_size, file_uuid, download_url } = await response.json();
            document.getElementById('text_to_copy').value = download_url;

            localStorage.setItem('file_uid', file_uuid);
            if (response.ok) {
                // File was successfully uploaded
                alert("File uploaded successfully");
            } else {
                // Handle any errors here
                alert("File upload failed");
            }
            img.classList.remove('upload_animation_class');
        } catch (error) {
            console.error("Fetch error: " + error);
            const img = document.querySelector('.icon-container img');
            img.classList.add('upload_animation_class');
        }
    }
});



document.getElementById('fileShareForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form_data = new FormData(document.getElementById('fileShareForm'));
    form_data.append('file_uuid', localStorage.getItem('file_uid'));

    try {
        const response = await fetch('http://localhost:8000/api/files/share/email', {
            method: 'POST',
            body: form_data
        });

        const res = await response.json();

    } catch (error) {
        console.log(error);
    }
});

