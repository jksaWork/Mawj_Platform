<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    function getCompanyId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function fetchCompanyById(companyId) {
        const apiUrl = `https://mawjplatform.com/API/mobile_api/web-company-view.php?key=2022@mec*app&id=${companyId}`;
        console.log(`Fetching company details from: ${apiUrl}`);

        return fetch(apiUrl)
            .then(response => {
                return response.json();
                console.log(`Response status: ${response.status}`);
                if (!response.ok) {
                    return response().json(); //throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API response data:', data); // Debugging line
                return data;
            })
            .catch(error => {
                console.error('Fetch error:', error);
                throw error;
            });
    }

    function displayCompany(company) {
        const baseUrl = 'https://mawjplatform.com/mec/';
        const container = document.querySelector('.company-view-container');
        if (!container) {
            console.error('Container element not found');
            return;
        }


        const {
            company_logo = 'images/resource/default.jpg',
            company_name = 'Company Name',
            legal_name = 'Legal Name',
            shop_address,
            phone = 'Phone Number',
            email = 'Email Address',
            experience = 'N/A',
            linkedin = '#',
            facebook = '#',
            instagram = '#',
            twitter = '#',
            shop_map = '#',
            shop_logo = '',
            shop_banner = '',
            about = 'About Us',
            u_id,
            sc_title,
            shop_name

        } = company[0];

        document.querySelector("title").innerHTML = shop_name + " | Mawj Platform"


        const companyLogoUrl = company_logo ? `${baseUrl}${company_logo}` : 'images/resource/default.jpg';
        const shopLogoUrl = shop_logo ? `${baseUrl}${shop_logo}` : '';
        const shopBannerUrl = shop_banner ? `${baseUrl}${shop_banner}` : '';
        const companyHtml = `
        <div class="company-block-three" style="width: 100%;">
            <div class="inner-box">
                <div class="image">
                    <a href="viewcompany.html?id=${u_id}"><img src="${shopBannerUrl}" alt="${shop_name}" /></a>
                </div>
                <div class="lower-content">
                    <div class="author-info">
                        <span class="author-image"><img src="${shopLogoUrl}" alt="${shop_name}" /></span>
                        
                    </div>
                    <div class="category">${sc_title || 'Category not available'}</div>
                    <h5><a href="viewcompany.html?id=${u_id}">${shop_name || 'Company Name'}</a></h5>
                    <div style="color:#000">
                        <p id="legal-name" style="color:#000">${legal_name}</p>
                        <p id="shop-address" style="color:#000" >${shop_address}</p>
                        <p id="phone" style="color:#000" >${phone}</p>
                        <p id="email" style="color:#000" >${email}</p>
                        <p id="experience" style="color:#000" >Experience: ${experience}</p>
                        <div class="social-links" style="color:#000">
                            <a id="linkedin" href="${linkedin}" style="color:#000" target="_blank">LinkedIn</a>
                            <a id="facebook" href="${facebook}" style="color:#000" target="_blank">Facebook</a>
                            <a id="instagram" href="${instagram}" style="color:#000"  target="_blank">Instagram</a>
                            <a id="twitter" href="${twitter}" style="color:#000"  target="_blank">Twitter</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    `;

        container.innerHTML = `
            <div class="company-view row align-items-start">
                <div class="view-inner-box col-md-8">
                    ${companyHtml}
                </div>
                    <div class="about-box col-md-4" style="border:none; box-shadow:none; ">
                    <h4>About Us</h4>
                    <p id="about-us">${about}</p>
                </div>
            </div>
            <div class="content-block about-container">
            
            </div>
        `;
    }

    function loadCompany() {
        const companyId = getCompanyId();
        if (companyId) {
            fetchCompanyById(companyId)
                .then(data => {
                    console.log("Before Data Comanby");
                    if (data && data.success && data.company) {
                        displayCompany(data.company);
                    } else {
                        console.error('Company details not found in the response:', data);
                        document.getElementById('error-message').textContent = 'Company details not found.';
                    }
                })
                .catch(error => {
                    document.getElementById('error-message').textContent = 'Error loading company details.';
                    console.error('Error loading company:', error);
                });
        } else {
            document.getElementById('error-message').textContent = 'No company ID found in URL.';
        }
    }

    loadCompany();

    function sendLinkToWhatsApp(e) {
        e.preventDefault();
        const form = e.target;
        console.log(form);
        const name = form.name.value;
        const message = document.getElementById("message").value;
        if (name) {
            const phoneNumber = '9710504830307'; // Replace with the desired phone number
            const messageToWatsapp = `Hello, my name is ${encodeURIComponent(name)} I need to say  ${encodeURIComponent(message)} `; // Encode the name for URL
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${messageToWatsapp}`;

            window.open(whatsappLink, '_blank'); // Opens the WhatsApp link in a new tab
        } else {
            alert("Please enter your name.");
        }
    }
    document.getElementById("contact_form").addEventListener("submit", sendLinkToWhatsApp);



    async function getCompanyProjects(companyId) {

        const formdata = new FormData();
        formdata.append("pid", companyId);
        formdata.append("uid", "2");
        formdata.append("key", "2022@mec*app");

        const requestOptions = {
            method: "POST",
            body: formdata,
        };

        const projects = await fetch("https://mawjplatform.com/API/mobile_api/company-view.php", requestOptions)
            .then((response) => response.json())
            .then((result) => result.projects)
            .catch((error) => console.error(error, "error"));

            console.log(projects, "affter Fetching Project");
        // console.log(projects);
        let projectHTML = '';
        if (projects.length > 0) {
        
            for (let i = 0; i < projects.length; i++) {
                if (i === 3) break; // Stop at index 2
            
                const el = projects[i]; // Get the current project element
                projectHTML += `<div class="news-block-three cusom_card">
                    <div class="inner-box">
                        <div class="image">
                            <a href="projectview.html?id=${el.p_id}">
                                <img src="https://mawjplatform.com/mec/${el.p_image}" alt="${el.p_title}">
                            </a>
                        </div>
                        <div class="lower-content">
                            <h5>
                                <a href="projectview.html?id=${el.p_id}" class="">${el.p_title}</a>
                            </h5>
                        </div>
                    </div>
                </div>`;
            }
        }

        document.getElementById("projects_container").innerHTML = projectHTML;
    }

    getCompanyProjects(269)
});
=======
document.addEventListener('DOMContentLoaded', () => {
    function getCompanyId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function fetchCompanyById(companyId) {
        const apiUrl = `https://mawjplatform.com/API/mobile_api/web-company-view.php?key=2022@mec*app&id=${companyId}`;
        console.log(`Fetching company details from: ${apiUrl}`);

        return fetch(apiUrl)
            .then(response => {
                return response.json();
                console.log(`Response status: ${response.status}`);
                if (!response.ok) {
                    return response().json(); //throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API response data:', data); // Debugging line
                return data;
            })
            .catch(error => {
                console.error('Fetch error:', error);
                throw error;
            });
    }

    function displayCompany(company) {
        const baseUrl = 'https://mawjplatform.com/mec/';
        const container = document.querySelector('.company-view-container');
        if (!container) {
            console.error('Container element not found');
            return;
        }


        const {
            company_logo = 'images/resource/default.jpg',
            company_name = 'Company Name',
            legal_name = 'Legal Name',
            shop_address,
            phone = 'Phone Number',
            email = 'Email Address',
            experience = 'N/A',
            linkedin = '#',
            facebook = '#',
            instagram = '#',
            twitter = '#',
            shop_map = '#',
            shop_logo = '',
            shop_banner = '',
            about = 'About Us',
            u_id,
            sc_title,
            shop_name

        } = company[0];

        document.querySelector("title").innerHTML = shop_name + " | Mawj Platform"


        const companyLogoUrl = company_logo ? `${baseUrl}${company_logo}` : 'images/resource/default.jpg';
        const shopLogoUrl = shop_logo ? `${baseUrl}${shop_logo}` : '';
        const shopBannerUrl = shop_banner ? `${baseUrl}${shop_banner}` : '';
        const companyHtml = `
        <div class="company-block-three" style="width: 100%;">
            <div class="inner-box">
                <div class="image">
                    <a href="viewcompany.html?id=${u_id}"><img src="${shopBannerUrl}" alt="${shop_name}" /></a>
                </div>
                <div class="lower-content">
                    <div class="author-info">
                        <span class="author-image"><img src="${shopLogoUrl}" alt="${shop_name}" /></span>
                        
                    </div>
                    <div class="category">${sc_title || 'Category not available'}</div>
                    <h5><a href="viewcompany.html?id=${u_id}">${shop_name || 'Company Name'}</a></h5>
                    <div style="color:#000">
                        <p id="legal-name" style="color:#000">${legal_name}</p>
                        <p id="shop-address" style="color:#000" >${shop_address}</p>
                        <p id="phone" style="color:#000" >${phone}</p>
                        <p id="email" style="color:#000" >${email}</p>
                        <p id="experience" style="color:#000" >Experience: ${experience}</p>
                        <div class="social-links" style="color:#000">
                            <a id="linkedin" href="${linkedin}" style="color:#000" target="_blank">LinkedIn</a>
                            <a id="facebook" href="${facebook}" style="color:#000" target="_blank">Facebook</a>
                            <a id="instagram" href="${instagram}" style="color:#000"  target="_blank">Instagram</a>
                            <a id="twitter" href="${twitter}" style="color:#000"  target="_blank">Twitter</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    `;

        container.innerHTML = `
            <div class="company-view row align-items-start">
                <div class="view-inner-box col-md-8">
                    ${companyHtml}
                </div>
                    <div class="about-box col-md-4" style="border:none; box-shadow:none; ">
                    <h4>About Us</h4>
                    <p id="about-us">${about}</p>
                </div>
            </div>
            <div class="content-block about-container">
            
            </div>
        `;
    }

    function loadCompany() {
        const companyId = getCompanyId();
        if (companyId) {
            fetchCompanyById(companyId)
                .then(data => {
                    console.log("Before Data Comanby");
                    if (data && data.success && data.company) {
                        displayCompany(data.company);
                    } else {
                        console.error('Company details not found in the response:', data);
                        document.getElementById('error-message').textContent = 'Company details not found.';
                    }
                })
                .catch(error => {
                    document.getElementById('error-message').textContent = 'Error loading company details.';
                    console.error('Error loading company:', error);
                });
        } else {
            document.getElementById('error-message').textContent = 'No company ID found in URL.';
        }
    }

    loadCompany();

    function sendLinkToWhatsApp(e) {
        e.preventDefault();
        const form = e.target;
        console.log(form);
        const name = form.name.value;
        const message = document.getElementById("message").value;
        if (name) {
            const phoneNumber = '9710504830307'; // Replace with the desired phone number
            const messageToWatsapp = `Hello, my name is ${encodeURIComponent(name)} I need to say  ${encodeURIComponent(message)} `; // Encode the name for URL
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${messageToWatsapp}`;

            window.open(whatsappLink, '_blank'); // Opens the WhatsApp link in a new tab
        } else {
            alert("Please enter your name.");
        }
    }
    document.getElementById("contact_form").addEventListener("submit", sendLinkToWhatsApp);



    async function getCompanyProjects(companyId) {

        const formdata = new FormData();
        formdata.append("pid", companyId);
        formdata.append("uid", "2");
        formdata.append("key", "2022@mec*app");

        const requestOptions = {
            method: "POST",
            body: formdata,
        };

        const projects = await fetch("https://mawjplatform.com/API/mobile_api/company-view.php", requestOptions)
            .then((response) => response.json())
            .then((result) => result.projects)
            .catch((error) => console.error(error, "error"));

            console.log(projects, "affter Fetching Project");
        // console.log(projects);
        let projectHTML = '';
        if (projects.length > 0) {
        
            for (let i = 0; i < projects.length; i++) {
                if (i === 3) break; // Stop at index 2
            
                const el = projects[i]; // Get the current project element
                projectHTML += `<div class="news-block-three cusom_card">
                    <div class="inner-box">
                        <div class="image">
                            <a href="projectview.html?id=${el.p_id}">
                                <img src="https://mawjplatform.com/mec/${el.p_image}" alt="${el.p_title}">
                            </a>
                        </div>
                        <div class="lower-content">
                            <h5>
                                <a href="projectview.html?id=${el.p_id}" class="">${el.p_title}</a>
                            </h5>
                        </div>
                    </div>
                </div>`;
            }
        }

        document.getElementById("projects_container").innerHTML = projectHTML;
    }

    getCompanyProjects(269)
});
>>>>>>> dd7f35ff432aa9d063afdd0909376ba226a52ed2
