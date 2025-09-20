module.exports = {
    name: "Kai Web Services",
    email: "info@kaiwebservices.com",
    phoneForTel: "808-365-8530",
    phoneFormatted: "(555) 779-4407",
    address: {
        lineOne: "Hawaii County, HI",
       
      
    },
    socials: {
        facebook: "https://www.facebook.com/kaiwebservices",
        instagram: "https://www.instagram.com/kaiwebservices",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://kaiwebservices.com",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
