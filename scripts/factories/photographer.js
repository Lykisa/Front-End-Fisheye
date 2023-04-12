function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const lien = document.createElement('a');
        lien.href = `./photographer.html?id=` + id;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const p = document.createElement('p');
        p.textContent = city + ', ' + country;

        const p2 = document.createElement('p');
        p2.classList.add("p2")
        p2.textContent = tagline;

        const p3 = document.createElement('p');
        p3.classList.add("p3")
        p3.textContent = price + '€/jour'

        article.appendChild(lien);
        lien.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(p2);
        article.appendChild(p3);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}