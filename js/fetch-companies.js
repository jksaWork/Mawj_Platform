

document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://mawjplatform.com/API/mobile_api/web-companies.php?key=2022@mec*app&page=';
    const container = document.querySelector('.outer-container .row'); 
    let currentPage = 1;
    let hasMoreData = true;

    function fetchCompanies(page) {
        console.log(`Fetching page ${page}...`);

        fetch(apiUrl + page)
            .then(response => {
                console.log(`Response status for page ${page}: ${response.status}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(`Page ${page} response:`, data);

                if (data.success && Array.isArray(data.company) && data.company.length > 0) {
                    data.company.forEach(company => {
                        const bannerUrl = company.shop_banner ? `https://mawjplatform.com/mec/${company.shop_banner}` : 'images/resource/default-banner.jpg';
                        const logoUrl = company.shop_logo ? `https://mawjplatform.com/mec/${company.shop_logo}` : 'images/resource/default-logo.jpg';

                        const companyHtml = `
                            <div class="company-block-three">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="viewcompany.html?id=${company.u_id}"><img src="${bannerUrl}" alt="${company.shop_name}" /></a>
                                    </div>
                                    <div class="lower-content">
                                        <div class="author-info">
                                            <span class="author-image"><img src="${logoUrl}" alt="${company.shop_name}" /></span>
                                            
                                        </div>
                                        <div class="category">${company.sc_title || 'Category not available'}</div>
                                        <h5><a href="viewcompany.html?id=${company.u_id}">${company.shop_name || 'Company Name'}</a></h5>
                                    </div>
                                </div>
                            </div>
                        `;
                        container.insertAdjacentHTML('beforeend', companyHtml);
                    });

                    currentPage++;
                    if (hasMoreData) {
                        fetchCompanies(currentPage);
                    }
                } else {
                    console.log(`No more data available after page ${page}.`);
                    hasMoreData = false;
                }
            })
            .catch(error => {
                console.error(`Error fetching page ${page}:`, error);
                hasMoreData = false;
            });
    }

    fetchCompanies(currentPage);
});
