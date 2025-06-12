document.addEventListener("DOMContentLoaded", function () {
    // Select all images inside the gallery
    const images = document.querySelectorAll("#gallery .cs-image-group img");

    images.forEach((img) => {
        img.addEventListener("click", function () {
            openLightbox(this.src);
        });
    });

    function openLightbox(imageSrc) {
        // Create lightbox container
        const lightbox = document.createElement("div");
        lightbox.style.position = "fixed";
        lightbox.style.top = "0"; // Start at top but push content down
        lightbox.style.left = "0";
        lightbox.style.width = "100vw";
        lightbox.style.height = "100vh";
        lightbox.style.background = "rgba(0, 0, 0, 0.8)";
        lightbox.style.display = "flex";
        lightbox.style.justifyContent = "center";
        lightbox.style.alignItems = "flex-start"; // Align at the top
        lightbox.style.paddingTop = "var(--header-height, 80px)"; // Moves image below header
        lightbox.style.zIndex = "1000";

        // Create image element
        const img = document.createElement("img");
        img.src = imageSrc;
        img.style.maxWidth = "90vw";
        img.style.maxHeight = "calc(100vh - var(--header-height, 80px) - 40px)"; // Leaves space for header + margin
        img.style.borderRadius = "8px";
        img.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5)";
        img.style.objectFit = "contain";
        img.style.margin = "auto";

        // Close lightbox on click
        lightbox.addEventListener("click", function () {
            document.body.removeChild(lightbox);
        });

        // // Prevent closing when clicking the image itself
        // img.addEventListener("click", function (event) {
        //     event.stopPropagation();
        // });

        // Append elements
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
    }
});
