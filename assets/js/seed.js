// Starting data for a new store: settings, categories, variations, the 55
// products from the old ravaribd.com shop, page content and menus.
// The server copies this into data/db.json on first run; the demo copies it
// into the browser. Edit the live data from the admin panel, not here.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.RAVARI_SEED = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // Product photos: front, front close-up, side, back (assets/img/products/<name>-1..4.webp)
  var photos = function (name, count) { var out = []; for (var i = 1; i <= count; i++) out.push("assets/img/products/" + name + "-" + i + ".webp"); return out; };
  var T0 = Date.UTC(2026, 9, 20);

  // ---------------------------------------------------------------------------
  // Categories (from the ravaribd.com menu)
  // ---------------------------------------------------------------------------
  var CATS = [
    ["men", "Men", null, 1, "assets/img/home/r-hero-wide.webp", "Shirts and panjabis for men."],
    ["winter-collection", "Winter Collection", "men", 1, "assets/img/products/classic-double-pocket-denim-shirt-blue-1.webp", "Denim and corduroy shirts for the cooler days."],
    ["denim-shirt", "Denim Shirt", "winter-collection", 1, "assets/img/products/classic-double-pocket-denim-shirt-blue-1.webp", "Heavyweight denim and corduroy shirts."],
    ["sweat-shirt", "Sweat Shirt", "winter-collection", 2, "assets/img/home/r-card-sweat.webp", "Half-zip sweatshirts, warm and easy to wear."],
    ["jacket", "Jacket", "winter-collection", 3, "assets/img/home/r-card-jacket.webp", "Velvet and check jackets to layer over a tee."],
    ["denim-pant", "Denim Pant", "winter-collection", 4, "assets/img/products/baggy-denim-pant-black-1.webp", "Baggy denim pants with a relaxed wide leg."],
    ["summer", "Summer", "men", 2, "assets/img/home/r-lb-1.webp", "Full and half sleeve shirts for the warm months."],
    ["ethnic-wear", "Ethnic Wear", "men", 3, "assets/img/home/r-lb-2.webp", "Panjabis and payjamas for Eid, weddings and every occasion."],
    ["full-shirt", "Full Sleeve Shirt", "summer", 1, "assets/img/home/r-lb-1.webp", "Premium full sleeve casual shirts."],
    ["half-shirt", "Half Sleeve Shirt", "summer", 2, "assets/img/home/r-lb-3.webp", "Half sleeve casual shirts in bold prints."],
    ["panjabi", "Premium Panjabi", "ethnic-wear", 1, "assets/img/home/r-lb-2.webp", "Embroidered, sequin and classic cotton panjabis."],
    ["payjama", "Payjama", "ethnic-wear", 2, "assets/img/home/r-lb-2.webp", "Cotton payjamas to wear with a panjabi."],
    ["on-sale", "On Sale", null, 3, "assets/img/home/r-panjabi-wide.webp", "Picks on sale now."]
  ];
  // A short paragraph under each category's products, written for search engines (Admin › Categories)
  var SEO_TEXT = {
    "men": "Casual shirts and premium panjabis for men from Ravari, Dhaka. Cash on delivery all over Bangladesh.",
    "full-shirt": "Ravari full sleeve casual shirts in premium cotton, with modern prints and a comfortable fit. Delivered across Bangladesh with cash on delivery.",
    "half-shirt": "Half sleeve casual shirts in breathable cotton with bold prints, made for everyday wear in the heat.",
    "panjabi": "Premium embroidered, sequin and classic cotton panjabis for Eid, weddings and every occasion. Cash on delivery all over Bangladesh.",
    "denim-shirt": "Heavyweight denim and corduroy shirts for layering through the cooler months.",
    "jacket": "Ravari winter jackets for men: velvet and check jackets made to layer over a tee. Cash on delivery all over Bangladesh.",
    "denim-pant": "Ravari baggy denim pants for men with a relaxed wide leg. Cash on delivery all over Bangladesh.",
    "sweat-shirt": "Ravari half-zip sweatshirts for men, soft and warm for the cooler months. Cash on delivery all over Bangladesh."
  };
  var SEO_TITLE = { "men": "Men's Shirts and Panjabis in Bangladesh", "full-shirt": "Full Sleeve Shirts in Bangladesh", "half-shirt": "Half Sleeve Shirts in Bangladesh", "panjabi": "Premium Panjabi in Bangladesh", "denim-shirt": "Denim Shirts in Bangladesh", "jacket": "Men's Winter Jackets in Bangladesh", "sweat-shirt": "Men's Sweat Shirts in Bangladesh", "denim-pant": "Baggy Denim Pants in Bangladesh" };
  var categories = CATS.map(function (c) {
    return { id: "cat_" + c[0].replace(/-/g, "_"), slug: c[0], name: c[1], parentId: c[2] ? "cat_" + c[2].replace(/-/g, "_") : null,
      order: c[3], image: c[4], description: c[5], seoText: SEO_TEXT[c[0]] || "", seoTitle: SEO_TITLE[c[0]] || "", createdAt: T0 };
  });

  var attributes = [
    { id: "att_size", name: "Size", type: "button", values: ["M", "L", "XL", "XXL"].map(function (v) { return { label: v }; }), createdAt: T0 },
    { id: "att_color", name: "Color", type: "color", values: [{"label": "Blue", "hex": "#3b5677"}, {"label": "Gray", "hex": "#8a8d91"}, {"label": "Black", "hex": "#1f2022"}, {"label": "Brown", "hex": "#6b4a35"}, {"label": "Off-White", "hex": "#ece6d8"}, {"label": "Yellow", "hex": "#d8b84a"}, {"label": "Coffee", "hex": "#5b4335"}, {"label": "White", "hex": "#f4f4f2"}, {"label": "Olive", "hex": "#6b6b3a"}, {"label": "Black (Mixed)", "hex": "#2b2c2e"}, {"label": "Light Pink", "hex": "#e8b9c0"}, {"label": "Bronze", "hex": "#8c6a3f"}, {"label": "Maroon", "hex": "#6d1f2a"}, {"label": "Bottle Green", "hex": "#1f4a3a"}, {"label": "Peach", "hex": "#f0b99a"}, {"label": "Red", "hex": "#b52a45"}, {"label": "Red (Mixed)", "hex": "#a3343f"}], createdAt: T0 }
  ];

  // ---------------------------------------------------------------------------
  // Products, imported from the old ravaribd.com shop (November 2026). One colour
  // is one product; sizes are its variations with the stock the old shop had.
  // Row: slug, name, colour, swatch, price, compare-at price, categories, photo
  // count, description, details, [size, stock] pairs.
  // ---------------------------------------------------------------------------
  var P = [
    ["solid-velvet-jacket-black", "Solid Velvet Jacket – Black", "Black", "#1f2022", 2499, 0, ["jacket", "winter-collection"], 6, "A clean solid velvet jacket with a soft touch and a full zip. Easy to dress up or down, from a casual day out to a winter evening.", ["Soft velvet fabric", "Full front zip", "Shirt collar", "Side pockets", "Relaxed fit, made to layer over a tee"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-velvet-jacket-navy", "Solid Velvet Jacket – Navy", "Navy", "#26355a", 2499, 0, ["jacket", "winter-collection"], 6, "A clean solid velvet jacket with a soft touch and a full zip. Easy to dress up or down, from a casual day out to a winter evening.", ["Soft velvet fabric", "Full front zip", "Shirt collar", "Side pockets", "Relaxed fit, made to layer over a tee"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-velvet-jacket-maroon", "Solid Velvet Jacket – Maroon", "Maroon", "#7a1f2e", 2499, 0, ["jacket", "winter-collection"], 5, "A clean solid velvet jacket with a soft touch and a full zip. Easy to dress up or down, from a casual day out to a winter evening.", ["Soft velvet fabric", "Full front zip", "Shirt collar", "Side pockets", "Relaxed fit, made to layer over a tee"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-velvet-jacket-stone", "Solid Velvet Jacket – Stone", "Stone", "#bdb6a8", 2499, 0, ["jacket", "winter-collection"], 7, "A clean solid velvet jacket with a soft touch and a full zip. Easy to dress up or down, from a casual day out to a winter evening.", ["Soft velvet fabric", "Full front zip", "Shirt collar", "Side pockets", "Relaxed fit, made to layer over a tee"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-velvet-jacket-tan", "Solid Velvet Jacket – Tan", "Tan", "#a8743f", 2499, 0, ["jacket", "winter-collection"], 5, "A clean solid velvet jacket with a soft touch and a full zip. Easy to dress up or down, from a casual day out to a winter evening.", ["Soft velvet fabric", "Full front zip", "Shirt collar", "Side pockets", "Relaxed fit, made to layer over a tee"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["checked-jacket-blue", "Checked Jacket – Blue", "Blue", "#5b7fae", 2299, 0, ["jacket", "winter-collection"], 6, "A bold check jacket with two chest pockets and a full zip. Throw it over a white tee and loose trousers for an easy winter look.", ["Checked fabric with a soft brushed feel", "Full front zip", "Two flap chest pockets", "Shirt collar and buttoned cuffs", "Relaxed fit, made to layer over a tee"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["checked-jacket-grey", "Checked Jacket – Grey", "Grey", "#8d8f93", 2299, 0, ["jacket", "winter-collection"], 6, "A bold check jacket with two chest pockets and a full zip. Throw it over a white tee and loose trousers for an easy winter look.", ["Checked fabric with a soft brushed feel", "Full front zip", "Two flap chest pockets", "Shirt collar and buttoned cuffs", "Relaxed fit, made to layer over a tee"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["checked-jacket-black", "Checked Jacket – Black", "Black", "#1f2022", 2299, 0, ["jacket", "winter-collection"], 6, "A bold check jacket with two chest pockets and a full zip. Throw it over a white tee and loose trousers for an easy winter look.", ["Checked fabric with a soft brushed feel", "Full front zip", "Two flap chest pockets", "Shirt collar and buttoned cuffs", "Relaxed fit, made to layer over a tee"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["checked-jacket-beige", "Checked Jacket – Beige", "Beige", "#b9a58c", 2299, 0, ["jacket", "winter-collection"], 5, "A bold check jacket with two chest pockets and a full zip. Throw it over a white tee and loose trousers for an easy winter look.", ["Checked fabric with a soft brushed feel", "Full front zip", "Two flap chest pockets", "Shirt collar and buttoned cuffs", "Relaxed fit, made to layer over a tee"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["checked-jacket-charcoal", "Checked Jacket – Charcoal", "Charcoal", "#45474b", 2299, 0, ["jacket", "winter-collection"], 6, "A bold check jacket with two chest pockets and a full zip. Throw it over a white tee and loose trousers for an easy winter look.", ["Checked fabric with a soft brushed feel", "Full front zip", "Two flap chest pockets", "Shirt collar and buttoned cuffs", "Relaxed fit, made to layer over a tee"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-sweat-shirt-black", "Solid Sweat Shirt – Black", "Black", "#1f2022", 1599, 0, ["sweat-shirt", "winter-collection"], 4, "A half-zip sweatshirt in a solid colour with a high collar. Soft, warm and easy to wear every day through the cooler months.", ["Soft, warm fleece-back fabric", "Half zip with a high collar", "Ribbed cuffs and hem", "Regular fit"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-sweat-shirt-beige", "Solid Sweat Shirt – Beige", "Beige", "#b9a58c", 1599, 0, ["sweat-shirt", "winter-collection"], 6, "A half-zip sweatshirt in a solid colour with a high collar. Soft, warm and easy to wear every day through the cooler months.", ["Soft, warm fleece-back fabric", "Half zip with a high collar", "Ribbed cuffs and hem", "Regular fit"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-sweat-shirt-olive", "Solid Sweat Shirt – Olive", "Olive", "#4b5230", 1599, 0, ["sweat-shirt", "winter-collection"], 6, "A half-zip sweatshirt in a solid colour with a high collar. Soft, warm and easy to wear every day through the cooler months.", ["Soft, warm fleece-back fabric", "Half zip with a high collar", "Ribbed cuffs and hem", "Regular fit"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-sweat-shirt-brown", "Solid Sweat Shirt – Brown", "Brown", "#4a3426", 1599, 0, ["sweat-shirt", "winter-collection"], 6, "A half-zip sweatshirt in a solid colour with a high collar. Soft, warm and easy to wear every day through the cooler months.", ["Soft, warm fleece-back fabric", "Half zip with a high collar", "Ribbed cuffs and hem", "Regular fit"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-sweat-shirt-maroon", "Solid Sweat Shirt – Maroon", "Maroon", "#7a1f2e", 1599, 0, ["sweat-shirt", "winter-collection"], 6, "A half-zip sweatshirt in a solid colour with a high collar. Soft, warm and easy to wear every day through the cooler months.", ["Soft, warm fleece-back fabric", "Half zip with a high collar", "Ribbed cuffs and hem", "Regular fit"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-sweat-shirt-red", "Solid Sweat Shirt – Red", "Red", "#b51f2e", 1599, 0, ["sweat-shirt", "winter-collection"], 7, "A half-zip sweatshirt in a solid colour with a high collar. Soft, warm and easy to wear every day through the cooler months.", ["Soft, warm fleece-back fabric", "Half zip with a high collar", "Ribbed cuffs and hem", "Regular fit"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["solid-sweat-shirt-coffee", "Solid Sweat Shirt – Coffee", "Coffee", "#6a3c30", 1599, 0, ["sweat-shirt", "winter-collection"], 6, "A half-zip sweatshirt in a solid colour with a high collar. Soft, warm and easy to wear every day through the cooler months.", ["Soft, warm fleece-back fabric", "Half zip with a high collar", "Ribbed cuffs and hem", "Regular fit"], [["M", 5], ["L", 6], ["XL", 6], ["XXL", 4]]],
    ["baggy-denim-pant-black", "Baggy Denim Pant – Black", "Black", "#1f2022", 1699, 0, ["denim-pant", "winter-collection"], 5, "A loose, straight baggy denim pant with a relaxed wide leg. Wear it with sneakers and a tee, a sweatshirt or a jacket.", ["Cotton denim", "Baggy, straight wide leg", "Classic five pocket style", "Zip fly with button"], [["30", 5], ["32", 6], ["34", 6], ["36", 4]]],
    ["baggy-denim-pant-off-white", "Baggy Denim Pant – Off White", "Off White", "#ebe6dc", 1699, 0, ["denim-pant", "winter-collection"], 5, "A loose, straight baggy denim pant with a relaxed wide leg. Wear it with sneakers and a tee, a sweatshirt or a jacket.", ["Cotton denim", "Baggy, straight wide leg", "Classic five pocket style", "Zip fly with button"], [["30", 5], ["32", 6], ["34", 6], ["36", 4]]],
    ["classic-double-pocket-denim-shirt-blue", "Classic Double Pocket Denim Shirt – Blue", "Blue", "#3b5677", 1299, 0, ["denim-shirt", "winter-collection"], 4, "", [], [["M", 10], ["L", 3], ["XL", 4], ["XXL", 1]]],
    ["classic-denim-casual-shirt-gray", "Classic Denim Casual Shirt – Gray", "Gray", "#8a8d91", 1299, 0, ["denim-shirt", "winter-collection"], 2, "Crafted from premium, heavyweight cotton denim, it offers extra insulation and structure, making it a perfect layering piece for crisp autumn days and chilly winter evenings. Wear it buttoned up over a thermal, or leave it open as an overshirt paired with your favorite jacket for an effortlessly cool, street-smart aesthetic.", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing", "Premium Heavyweight Denim: Durable cotton construction designed to offer extra warmth and structure for the cooler months.", "Classic Double-Pocket Design: Features dual chest pockets with secure button flaps for a rugged, utilitarian look.", "Versatile Winter Layering: Easily pairs over tees or under heavy jackets, making it a versatile staple for transitional and winter weather.", "Timeless Vintage Wash: Rich blue indigo wash that pairs effortlessly with any jeans or chinos."], [["M", 0], ["L", 0], ["XL", 1], ["XXL", 1]]],
    ["classic-denim-shirt-with-accent-pocket-blue", "Classic Denim Shirt with Accent Pocket – Blue", "Blue", "#3b5677", 1299, 0, ["denim-shirt", "winter-collection"], 3, "Designed with a unique contrast chest pocket and classic button-down front, it adds subtle depth and visual interest to your cold-weather outfits. Whether worn on its own or layered open over a sleek T-shirt or turtleneck, this versatile piece transitions effortlessly from crisp autumn days to cooler winter outings.", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing", "Material: Premium Cotton Denim", "Fit: Modern Casual Fit", "Features: Long sleeves, button-down closure, collar neck, and a stylish contrast pocket accent", "Styling Tip: Pair it with black denim or trousers for a sharp, monochrome winter look, or layer it under a jacket when temperatures drop."], [["M", 3], ["L", 0], ["XL", 4], ["XXL", 0]]],
    ["corduroy-shirt-with-elbow-patches-blue", "Corduroy Shirt with Elbow Patches – Blue", "Blue", "#3b5677", 1299, 0, ["denim-shirt", "winter-collection"], 4, "Featuring a rich, textured black corduroy fabric complemented by contrasting elbow patches, it offers a rugged yet refined aesthetic. Whether you are layering it over a basic T-shirt for a crisp autumn evening or wearing it buttoned up during cooler winter days, this full-sleeve shirt delivers unmatched comfort and standout style.", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing", "Premium Fabric: Soft, durable, and heavyweight corduroy blend designed to provide warmth and comfort through the winter season.", "Classic Patch Detail: Features stylish contrasting elbow patches for a timeless, academic-chic look.", "Versatile Styling: Perfect for casual outings, winter gatherings, or layered streetwear looks.", "Functional Design: Includes a classic button-down front, a neat collar, and a secure chest pocket."], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 2]]],
    ["classic-black-denim-casual-shirt-black", "Classic Black Denim Casual Shirt", "Black", "#1f2022", 1299, 0, ["denim-shirt", "winter-collection"], 4, "Crafted from premium, heavyweight cotton denim, it offers extra insulation and structure, making it a perfect layering piece for crisp autumn days and chilly winter evenings. Wear it buttoned up over a thermal, or leave it open as an overshirt paired with your favorite jacket for an effortlessly cool, street-smart aesthetic.", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing", "Premium Heavyweight Denim: Durable cotton construction designed to offer extra warmth and structure for the cooler months.", "Classic Double-Pocket Design: Features dual chest pockets with secure button flaps for a rugged, utilitarian look.", "Versatile Winter Layering: Easily pairs over tees or under heavy jackets, making it a versatile staple for transitional and winter weather.", "Timeless Vintage Wash: Rich blue indigo wash that pairs effortlessly with any jeans or chinos."], [["M", 0], ["L", 0], ["XL", 2], ["XXL", 0]]],
    ["dual-tone-check-corduroy-shirt-blue", "Dual-Tone Check & Corduroy Shirt – Blue", "Blue", "#3b5677", 1299, 0, ["denim-shirt", "winter-collection"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing", "Premium Fabric: A soft, durable, heavyweight blend designed to provide warmth and comfort through the winter.", "Unique Patchwork Design: A modern fusion of solid brown corduroy and classic plaid.", "Versatile Styling: Perfect for casual outings, winter gatherings, or layered streetwear looks.", "Functional Details: Features a sturdy front button closure and a secure chest pocket. Featuring a striking dual-tone design, it pairs classic textured corduroy with a contrast check-pattern panel for a unique, rugged look. Whether you are layering it over a basic T-shirt for a crisp autumn evening or wearing it buttoned up during cooler winter days, this full-sleeve shirt delivers both unmatched comfort and standout street style."], [["M", 4], ["L", 0], ["XL", 5], ["XXL", 0]]],
    ["classic-blue-denim-casual-shirt-blue", "Classic Blue Denim Casual Shirt", "Blue", "#3b5677", 1299, 0, ["denim-shirt", "winter-collection"], 3, "Crafted from premium, heavyweight cotton denim, it offers extra insulation and structure, making it a perfect layering piece for crisp autumn days and chilly winter evenings. Wear it buttoned up over a thermal, or leave it open as an overshirt paired with your favorite jacket for an effortlessly cool, street-smart aesthetic.", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing", "Premium Heavyweight Denim: Durable cotton construction designed to offer extra warmth and structure for the cooler months.", "Classic Double-Pocket Design: Features dual chest pockets with secure button flaps for a rugged, utilitarian look.", "Versatile Winter Layering: Easily pairs over tees or under heavy jackets, making it a versatile staple for transitional and winter weather.", "Timeless Vintage Wash: Rich blue indigo wash that pairs effortlessly with any jeans or chinos."], [["M", 2], ["L", 1], ["XL", 5], ["XXL", 3]]],
    ["dual-tone-check-corduroy-shirt-brown", "Dual-Tone Check & Corduroy Shirt – Brown", "Brown", "#6b4a35", 1299, 0, ["denim-shirt", "winter-collection"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing", "Premium Fabric: A soft, durable, heavyweight blend designed to provide warmth and comfort through the winter.", "Unique Patchwork Design: A modern fusion of solid brown corduroy and classic plaid.", "Versatile Styling: Perfect for casual outings, winter gatherings, or layered streetwear looks.", "Functional Details: Features a sturdy front button closure and a secure chest pocket. Featuring a striking dual-tone design, it pairs classic textured corduroy with a contrast check-pattern panel for a unique, rugged look. Whether you are layering it over a basic T-shirt for a crisp autumn evening or wearing it buttoned up during cooler winter days, this full-sleeve shirt delivers both unmatched comfort and standout street style."], [["M", 2], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-casual-shirt-blue", "Premium Casual Shirt – Blue", "Blue", "#3b5677", 1499, 0, ["full-shirt"], 2, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 1], ["XXL", 1]]],
    ["half-sleeve-casual-shirt-off-white", "Half Sleeve Casual Shirt – Off-White", "Off-White", "#ece6d8", 1299, 0, ["half-shirt"], 2, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 2], ["L", 0], ["XL", 1], ["XXL", 0]]],
    ["half-sleeve-casual-shirt-blue", "Half Sleeve Casual Shirt – Blue", "Blue", "#3b5677", 1299, 0, ["half-shirt", "men"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 5], ["L", 6], ["XL", 3], ["XXL", 1]]],
    ["premium-casual-shirt-yellow", "Premium Casual Shirt – Yellow", "Yellow", "#d8b84a", 1499, 0, ["full-shirt", "men"], 2, "", ["Premium-quality Remi-Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["half-sleeve-casual-shirt-brown", "Half Sleeve Casual Shirt – Brown", "Brown", "#6b4a35", 1299, 0, ["half-shirt", "men"], 4, "", ["Premium-quality cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 5], ["L", 3], ["XL", 4], ["XXL", 0]]],
    ["premium-casual-shirt-blue-2", "Premium Casual Shirt – Blue", "Blue", "#3b5677", 1499, 0, ["full-shirt", "men"], 2, "", ["Premium-quality Remi-Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-casual-shirt-coffee", "Premium Casual Shirt – Coffee", "Coffee", "#5b4335", 1499, 0, ["full-shirt", "men"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-casual-shirt-white", "Premium Casual Shirt – White", "White", "#f4f4f2", 1499, 0, ["full-shirt", "men"], 4, "", ["Premium-quality Remi-Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 1]]],
    ["premium-embroidered-panjabi-olive", "Premium Embroidered Panjabi – Olive", "Olive", "#6b6b3a", 2699, 0, ["men", "panjabi"], 4, "", ["Premium Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-embroidered-panjabi-off-white", "Premium Embroidered Panjabi – Off-White", "Off-White", "#ece6d8", 2699, 0, ["men", "panjabi"], 4, "", ["Premium Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-embroidered-panjabi-blue", "Premium Embroidered Panjabi – Blue", "Blue", "#3b5677", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-cotton-sequin-panjabi-yellow", "Premium Cotton Sequin Panjabi – Yellow", "Yellow", "#d8b84a", 2699, 0, ["men", "panjabi"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 5], ["L", 3], ["XL", 2], ["XXL", 0]]],
    ["premium-classic-panjabi-brown", "Premium Classic Panjabi – Brown", "Brown", "#6b4a35", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-classic-panjabi-blue", "Premium Classic Panjabi – Blue", "Blue", "#3b5677", 2699, 0, ["men", "panjabi"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 3], ["XL", 0], ["XXL", 3]]],
    ["premium-classic-panjabi-black-mixed", "Premium Classic Panjabi – Black (Mixed)", "Black (Mixed)", "#2b2c2e", 2499, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 5], ["L", 1], ["XL", 6], ["XXL", 0]]],
    ["premium-classic-panjabi-light-pink", "Premium Classic Panjabi – Light Pink", "Light Pink", "#e8b9c0", 2699, 0, ["men", "panjabi"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-classic-panjabi-bronze", "Premium Classic Panjabi – Bronze", "Bronze", "#8c6a3f", 2699, 0, ["men", "panjabi"], 3, "", ["Premium-quality Cotton fabric", "Premium-quality fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["panjabi-maroon", "Panjabi – Maroon", "Maroon", "#6d1f2a", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-classic-panjabi-blue-2", "Premium Classic Panjabi – Blue", "Blue", "#3b5677", 2699, 0, ["men", "panjabi"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-embroidered-panjabi-olive-2", "Premium Embroidered Panjabi – Olive", "Olive", "#6b6b3a", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 3], ["L", 0], ["XL", 1], ["XXL", 0]]],
    ["premium-classic-panjabi-brown-2", "Premium Classic Panjabi – Brown", "Brown", "#6b4a35", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-embroidered-panjabi-off-white-2", "Premium Embroidered Panjabi – Off-White", "Off-White", "#ece6d8", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-embroidered-panjabi-white", "Premium Embroidered Panjabi – White", "White", "#f4f4f2", 2699, 0, ["men", "panjabi"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-embroidered-panjabi-black", "Premium Embroidered Panjabi – Black", "Black", "#1f2022", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 3], ["L", 0], ["XL", 2], ["XXL", 0]]],
    ["premium-embroidered-panjabi-bottle-green", "Premium Embroidered Panjabi – Bottle Green", "Bottle Green", "#1f4a3a", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 3], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-embroidered-panjabi-blue-2", "Premium Embroidered Panjabi – Blue", "Blue", "#3b5677", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 3], ["L", 0], ["XL", 3], ["XXL", 0]]],
    ["classic-cotton-panjabi-blue", "Classic Cotton Panjabi – Blue", "Blue", "#3b5677", 2699, 0, ["men", "panjabi"], 5, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["classic-cotton-panjabi-peach", "Classic Cotton Panjabi – Peach", "Peach", "#f0b99a", 2699, 0, ["men", "panjabi"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["classic-cotton-panjabi-black", "Classic Cotton Panjabi – Black", "Black", "#1f2022", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 2], ["XXL", 2]]],
    ["classic-cotton-panjabi-maroon", "Classic Cotton Panjabi – Maroon", "Maroon", "#6d1f2a", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["classic-cotton-panjabi-blue-2", "Classic Cotton Panjabi – Blue", "Blue", "#3b5677", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-embroidered-panjabi-gray", "Premium Embroidered Panjabi – Gray", "Gray", "#8a8d91", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 8], ["L", 1], ["XL", 6], ["XXL", 0]]],
    ["premium-embroidered-panjabi-bottle-green-2", "Premium Embroidered Panjabi – Bottle Green", "Bottle Green", "#1f4a3a", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 2], ["XXL", 0]]],
    ["premium-classic-panjabi-blue-3", "Premium Classic Panjabi – Blue", "Blue", "#3b5677", 2499, 0, ["men", "panjabi"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 3], ["L", 1], ["XL", 2], ["XXL", 0]]],
    ["premium-classic-panjabi-gray", "Premium Classic Panjabi – Gray", "Gray", "#8a8d91", 2499, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 2], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["half-sleeve-casual-shirt-blue-2", "Half Sleeve Casual Shirt – Blue", "Blue", "#3b5677", 1299, 0, ["half-shirt", "men"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["classic-cotton-panjabi-blue-3", "Classic Cotton Panjabi – Blue", "Blue", "#3b5677", 2699, 0, ["men", "panjabi"], 4, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 4], ["L", 1], ["XL", 4], ["XXL", 0]]],
    ["premium-casual-shirt-coffee-2", "Premium Casual Shirt – Coffee", "Coffee", "#5b4335", 1499, 0, ["full-shirt", "men"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 4], ["L", 0], ["XL", 0], ["XXL", 0]]],
    ["premium-casual-shirt-red", "Premium Casual Shirt – Red", "Red", "#b52a45", 1499, 0, ["full-shirt", "men"], 2, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 6], ["L", 6], ["XL", 5], ["XXL", 1]]],
    ["premium-casual-shirt-olive", "Premium Casual Shirt – Olive", "Olive", "#6b6b3a", 1499, 0, ["full-shirt", "men"], 2, "", ["Premium-quality Oxford Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 1], ["XL", 2], ["XXL", 1]]],
    ["premium-casual-shirt-black-mixed", "Premium Casual Shirt – Black (Mixed)", "Black (Mixed)", "#2b2c2e", 1499, 0, ["full-shirt", "men"], 2, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 4], ["L", 5], ["XL", 4], ["XXL", 2]]],
    ["half-sleeve-casual-shirt-brown-2", "Half Sleeve Casual Shirt – Brown", "Brown", "#6b4a35", 1299, 0, ["half-shirt", "men"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 4], ["L", 1], ["XL", 0], ["XXL", 0]]],
    ["half-sleeve-casual-shirt-red-mixed", "Half Sleeve Casual Shirt – Red (Mixed)", "Red (Mixed)", "#a3343f", 1299, 0, ["half-shirt", "men"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 6], ["L", 6], ["XL", 7], ["XXL", 2]]],
    ["half-sleeve-casual-shirt-brown-3", "Half Sleeve Casual Shirt – Brown", "Brown", "#6b4a35", 1299, 0, ["half-shirt", "men"], 2, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 6], ["L", 2], ["XL", 5], ["XXL", 1]]],
    ["half-sleeve-casual-shirt-black", "Half Sleeve Casual Shirt – Black", "Black", "#1f2022", 1299, 0, ["half-shirt", "men"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 3], ["L", 6], ["XL", 5], ["XXL", 3]]],
    ["half-sleeve-casual-shirt-olive", "Half Sleeve Casual Shirt – Olive", "Olive", "#6b6b3a", 1299, 0, ["half-shirt", "men"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 3], ["L", 3], ["XL", 2], ["XXL", 0]]],
    ["half-sleeve-casual-shirt-blue-3", "Half Sleeve Casual Shirt – Blue", "Blue", "#3b5677", 1299, 0, ["half-shirt", "men"], 3, "", ["Premium-quality Cotton fabric", "Comfortable and breathable for everyday wear", "Stylish and modern design", "Durable stitching and excellent finishing"], [["M", 0], ["L", 0], ["XL", 0], ["XXL", 0]]]
  ];
  var NEW = { "jacket": 1, "sweat-shirt": 1, "denim-pant": 1 };
  var products = P.map(function (r, i) {
    var sku = "RV-" + String(1001 + i);
    var cats = ["cat_men"].concat(r[6].filter(function (c) { return c !== "men"; }).map(function (c) { return "cat_" + c.replace(/-/g, "_"); }));
    return {
      id: "prd_" + r[0].replace(/-/g, "_").slice(0, 60), slug: r[0], sku: sku, status: "published",
      name: r[1], color: r[2], hex: r[3], price: r[4], comparePrice: r[5] || null,
      description: r[8], details: r[9].slice(), images: photos(r[0], r[7]), sizeGuide: "",
      categoryIds: cats, isNew: r[6].some(function (c) { return NEW[c]; }), featured: i < 8, trackStock: true, stock: 0,
      attributes: [{ name: "Size", values: r[10].map(function (v) { return v[0]; }) }],
      variants: r[10].map(function (v) { return { id: "var_" + i + "_" + v[0].toLowerCase(), sku: sku + "-" + v[0], options: { Size: v[0] }, price: null, stock: v[1] }; }),
      createdAt: T0 - i * 36e5, updatedAt: T0
    };
  });

  // ---------------------------------------------------------------------------
  // Settings
  // ---------------------------------------------------------------------------
  var settings = {
    store: {
      name: "Ravari", legalName: "Ravari – A Life Style Brand", tagline: "Bold, edge & classy.",
      email: "hello@ravaribd.com", phone: "+880 1875-006070", whatsapp: "8801875006070",
      address: "Dhaka, Bangladesh", hours: "Saturday to Thursday, 10am to 8pm",
      tradeLicense: "TRAD/DNCC/XXXXXX/2026", tin: "XXXXXXXXXXXX", dbid: "XXXXXXXXXX", bin: "", website: "https://ravaribd.com"
    },
    social: { facebook: "https://www.facebook.com/share/1DGsytccNU/", instagram: "https://www.instagram.com/ravari_bd", tiktok: "", youtube: "" },
    seo: { title: "Ravari – A Life Style Brand", description: "Premium casual shirts, denim shirts and panjabis for men from Dhaka. Bold, edge & classy. Cash on delivery all over Bangladesh." },
    shipping: {
      zones: [
        { id: "inside-dhaka", name: "Inside Dhaka", fee: 70, days: "1–3 days" },
        { id: "outside-dhaka", name: "Outside Dhaka", fee: 130, days: "3–5 days" }
      ],
      freeOver: 0, processing: "Orders are confirmed by phone and packed within 24 hours."
    },
    payments: { cod: true, sslcommerz: { enabled: true, sandbox: true, storeId: "" } },
    chat: { enabled: true, title: "Ravari", greeting: "Hi! Ask us anything about sizes, delivery or your order.",
      autoReply: true, autoReplyText: "Thanks for your message. We usually reply within a few minutes during store hours." },
    lowStock: 5,
    announcement: "Winter collection is here · Cash on delivery all over Bangladesh"
  };

  // ---------------------------------------------------------------------------
  // Pages. Text uses a light Markdown: "## " headings, "- " lists, **bold**.
  // ---------------------------------------------------------------------------
  var pages = {
    home: {
      hero: {
        line1: "Layer up", lead: "for", accent: "winter",
        cta1: "Shop now", cta1Link: "#shop",
        image: "assets/img/home/r-hero-sofa.webp", imageAlt: "Two models in a maroon and a grey velvet jacket on a pink sofa",
        note: "Winter collection 2026\nCash on delivery all over Bangladesh"
      },
      tryLook: {
        title: "Try Winter Looks", sub: "Styled head to toe. Tap a look to see the pieces.", panelTitle: "In this look", totalTitle: "Complete the look", cta: "Add full look to bag",
        looks: [
          { name: "Tan velvet", image: "assets/img/home/look-1.webp", imageAlt: "Model in a tan velvet jacket and black denim", products: "solid-velvet-jacket-tan, baggy-denim-pant-black" },
          { name: "Navy velvet", image: "assets/img/home/look-2.webp", imageAlt: "Model in a navy velvet jacket and off-white denim", products: "solid-velvet-jacket-navy, baggy-denim-pant-off-white" },
          { name: "Grey check", image: "assets/img/home/look-3.webp", imageAlt: "Model in a grey check jacket and black denim", products: "checked-jacket-grey, baggy-denim-pant-black" },
          { name: "Beige half-zip", image: "assets/img/home/look-4.webp", imageAlt: "Model in a beige sweat shirt and off-white denim", products: "solid-sweat-shirt-beige, baggy-denim-pant-off-white" },
          { name: "Stone velvet", image: "assets/img/home/look-5.webp", imageAlt: "Model in a stone velvet jacket and black denim", products: "solid-velvet-jacket-stone, baggy-denim-pant-black" },
          { name: "Olive half-zip", image: "assets/img/home/look-6.webp", imageAlt: "Model in an olive sweat shirt and off-white denim", products: "solid-sweat-shirt-olive, baggy-denim-pant-off-white" },
          { name: "Blue check", image: "assets/img/home/look-7.webp", imageAlt: "Model in a blue check jacket and off-white denim", products: "checked-jacket-blue, baggy-denim-pant-off-white" },
          { name: "Maroon half-zip", image: "assets/img/home/look-8.webp", imageAlt: "Model in a maroon sweat shirt and off-white denim", products: "solid-sweat-shirt-maroon, baggy-denim-pant-off-white" },
          { name: "Black check", image: "assets/img/home/look-9.webp", imageAlt: "Model in a black check jacket and black denim", products: "checked-jacket-black, baggy-denim-pant-black" },
          { name: "Brown half-zip", image: "assets/img/home/look-10.webp", imageAlt: "Model in a brown sweat shirt and off-white denim", products: "solid-sweat-shirt-brown, baggy-denim-pant-off-white" }
        ]
      },
      // Moving strip under the hero, then a bento: big photo, sticker card, two more photos
      house: {
        bigText: "Make your Winter 26/27 fashionable",
        ticker: "New drop ✱ Winter 26 ✱ Cash on delivery all over Bangladesh ✱ Made in Dhaka ✱ Sizes M to XXL ✱ ",
        card1: { image: "assets/img/home/r-card-jacket.webp", title: "Jacket", link: "#category/jacket" },
        card2: { image: "assets/img/home/r-card-winter.webp", title: "Winter 26/27", link: "#category/winter-collection" },
        card3: { image: "assets/img/home/r-card-sweat.webp", title: "Sweat Shirt", link: "#category/sweat-shirt" }
      },
      arrivals: {
        titleStart: "New", accent: "arrivals", titleEnd: "",
        // Tabs under the heading. Category is a category slug (t-shirt, half-shirt, full-shirt, trouser,
        // polo...) or top-selling; join several slugs with commas. Clear a label to hide its tab.
        tabs: [
          { label: "Jacket", category: "jacket" },
          { label: "Sweat Shirt", category: "sweat-shirt" },
          { label: "Denim Pant", category: "denim-pant" },
          { label: "Top Selling", category: "top-selling" },
          { label: "", category: "" }
        ]
      },
      // Three photo tiles with a glass label, on the dark band
      tiles: {
        eyebrow: "Shop by category",
        items: [
          { image: "assets/img/home/r-tile-1.webp", label: "Sweat shirt", link: "#category/sweat-shirt" },
          { image: "assets/img/home/r-tile-2.webp", label: "Full sleeve", link: "#category/full-shirt" },
          { image: "assets/img/home/r-tile-3.webp", label: "Denim & check", link: "#category/denim-shirt" }
        ]
      },
      // Big type around a cut-out model
      poster: {
        kicker: "Winter collection 2026", title: "", cta: "Shop winter", ctaLink: "#category/winter-collection",
        image: "assets/img/home/r-poster-bg.webp", imageAlt: "Two models in grey and black check jackets",
        marqueeTop: "Made in Dhaka. Cut for the cooler months: suede, denim and corduroy you can wear all season.", marqueeBottom: "Bold, edge\n& classy.", price: "From ৳1,299"
      },
      insta: {
        title: "Follow us on", handle: "Instagram", link: "https://www.instagram.com/ravari_bd",
        images: [
          { image: "assets/img/home/r-ig-1.webp" }, { image: "assets/img/home/r-ig-2.webp" }, { image: "assets/img/home/r-ig-3.webp" },
          { image: "assets/img/home/r-ig-4.webp" }, { image: "assets/img/home/r-ig-5.webp" }, { image: "assets/img/home/r-ig-6.webp" }
        ]
      },
      categories: { eyebrow: "Shop men" },
      footer: { tagline: "Bold, edge\n& classy.", newsletter: "Your email for new arrivals" }
    },
    about: {
      eyebrow: "About us", title: "Own your style.", accent: "Define", titleEnd: "your identity.",
      intro: "Ravari is a lifestyle brand from Dhaka. Bold, edge and classy.",
      image: "assets/img/about.webp", imageAlt: "Four models in Ravari premium panjabis",
      storyTitle: "Our story",
      story: "Ravari makes shirts and panjabis for men who like to look sharp without trying too hard. From printed casual shirts to embroidered panjabis for Eid and weddings, every piece is designed in Dhaka.\n\nEvery piece starts with fabric. We choose premium, breathable cotton and denim, then finish each piece with careful stitching so it lasts.\n\nOur goal is simple: bold, edge and classy clothing that is easy to buy, with cash on delivery all over Bangladesh.",
      values: [
        { title: "Quality first", text: "Premium cotton and denim, durable stitching and a clean finish." },
        { title: "Made to be worn", text: "Breathable fabrics for real days in Dhaka heat, not just photos." },
        { title: "Honest service", text: "Cash on delivery, easy exchanges and real people on the other end of the chat." }
      ],
      companyTitle: "Company details",
      companyText: "Ravari is a registered business in Bangladesh. These are our official details.",
      closing: "Welcome to Ravari."
    },
    contact: {
      eyebrow: "Contact us", title: "Talk to", accent: "us",
      intro: "Questions about sizes, an order or a collaboration? Send a message, chat with us or call during store hours.",
      formTitle: "Send a message", formNote: "We reply within one working day.",
      image: "assets/img/contact.webp"
    },
    // Home page popup banner (Admin › Popup banner): shows 2 seconds after the home page opens, once per visit
    popup: {
      enabled: true, delay: 2, image: "assets/img/products/classic-double-pocket-denim-shirt-blue-1.webp", mobileImage: "", imageAlt: "Ravari denim shirt",
      eyebrow: "New in", title: "Winter\ncollection", text: "Denim and corduroy shirts for the cooler days. Cash on delivery all over Bangladesh.",
      buttonText: "Shop winter", buttonLink: "#category/winter-collection", version: 1
    },
    // Store locations: shops are grouped by district, in the order set in districtOrder (Admin › Pages › Store locations)
    stores: {
      eyebrow: "Store locations", title: "Find a", accent: "Ravari", titleEnd: "store.",
      intro: "Try the fit in person. Every store carries the latest drops.",
      emptyText: "We have no shops yet, you can order online.",
      districtOrder: [],
      shops: []
    },
    franchise: {
      eyebrow: "Franchise", title: "Open a", accent: "Ravari", titleEnd: "store.",
      intro: "Bring Ravari to your city. We give you the brand, the stock and the support. You run the store.",
      points: [
        { title: "Proven products", text: "Our best-selling shirts and panjabis, restocked every month." },
        { title: "Full support", text: "Store design, staff training, launch marketing and our order system from day one." },
        { title: "Shared growth", text: "Online orders from your area can be picked up and exchanged at your store." }
      ],
      pdfTitle: "Franchise guide", pdfText: "Rules, investment, store requirements and how the franchise system works.", pdf: "",
      formTitle: "Request a franchise", formNote: "Tell us about you and your location, and pick a time to meet. We reply within two working days.",
      storiesTitle: "From our franchise partners",
      stories: []
    },
    terms: {
      title: "Terms & conditions", updated: "28 October 2026",
      intro: "Please read these terms carefully before using ravaribd.com. By using the website or placing an order, you agree to them.",
      body: "## 1. Definitions\n- **\"Ravari\", \"we\", \"us\"** means Ravari – A Life Style Brand, Dhaka, Bangladesh, which operates this website.\n- **\"Customer\", \"you\"** means anyone who visits the website or places an order.\n- **\"Products\"** means the clothing and accessories sold on this website.\n\n## 2. Using the website\n- You must be at least 18 years old, or use the website with a parent or guardian's permission.\n- You agree to give true and complete information when you place an order.\n- You must not misuse the website, try to break its security, or copy its content for commercial use.\n\n## 3. Products and prices\n- We show product colours as accurately as we can. Screens differ, so the actual colour may vary slightly.\n- All prices are in Bangladeshi Taka (৳) and include VAT where it applies. Delivery charges are shown at checkout.\n- We may change prices or end offers at any time. The price you pay is the price shown when you place the order.\n\n## 4. Orders\n- After you place an order, we call or message you to confirm it. An order is accepted once we confirm it.\n- We may cancel an order if a product is out of stock, the price was shown wrongly, or we can't verify the order. If you paid online, we refund you in full.\n\n## 5. Payment\n- You can pay cash on delivery, or online by card, mobile banking or internet banking through SSLCOMMERZ.\n- Online payments are processed by SSLCOMMERZ. We never see or store your card details.\n\n## 6. Delivery\nDelivery times and charges are explained in our [Delivery policy](#delivery).\n\n## 7. Returns, exchanges and refunds\nYou can exchange or return products as explained in our [Return & refund policy](#refund).\n\n## 8. Intellectual property\nAll content on this website, including designs, logos, photos and text, belongs to Ravari. You may not use it without our written permission.\n\n## 9. Limitation of liability\nWe are not responsible for indirect losses arising from the use of this website. Nothing in these terms limits your rights under the Consumer Rights Protection Act, 2009.\n\n## 10. Governing law\nThese terms are governed by the laws of Bangladesh. Disputes are handled by the courts of Dhaka.\n\n## 11. Changes\nWe may update these terms. The date at the top shows the latest version.\n\n## 12. Contact\nQuestions about these terms? Visit our [Contact page](#contact)."
    },
    privacy: {
      title: "Privacy policy", updated: "28 October 2026",
      intro: "Your privacy matters to us. This policy explains what we collect when you use ravaribd.com, how we use it and how we keep it safe.",
      body: "## 1. Information we collect\n- **Order details:** your name, phone number, email, delivery address and the products you buy.\n- **Messages:** what you send through the contact form or chat.\n- **Usage data:** pages you visit and products you view, collected without your name.\n\n## 2. How we use it\n- To confirm, deliver and support your orders.\n- To reply to your messages and chats.\n- To improve the website and our products.\n- To send offers, only if you sign up for them. You can unsubscribe at any time.\n\n## 3. Payment security\n- Online payments are processed by **SSLCOMMERZ**, a payment gateway licensed by Bangladesh Bank and certified to PCI DSS.\n- Card numbers, PINs and mobile banking passwords are entered on SSLCOMMERZ's secure page, not on our website. We never see or store them.\n- Our website uses HTTPS encryption, so everything you send to us is encrypted on the way.\n- We only receive the payment result and a transaction reference, which we keep with your order.\n\n## 4. Cookies\n- **Essential cookies and storage** keep your bag, saved items and checkout working. The website can't work without them.\n- **Analytics** counts visits and product views so we know what people like. It does not identify you.\n- You can delete or block cookies in your browser settings. If you block essential storage, your bag may not be saved.\n- We do not use cookies for third-party advertising.\n\n## 5. Sharing your information\n- We share your name, phone and address with our delivery partners so they can deliver your order.\n- We share payment details with SSLCOMMERZ to process online payments.\n- We never sell your personal information.\n\n## 6. How long we keep it\nWe keep order records for as long as the law requires for tax and accounting. You can ask us to delete other information at any time.\n\n## 7. Your rights\nYou can ask to see, correct or delete your personal information. Contact us through the [Contact page](#contact).\n\n## 8. Children\nOur website is not meant for children under 13, and we don't knowingly collect their information.\n\n## 9. Changes\nWe may update this policy. The date at the top shows the latest version."
    },
    refund: {
      title: "Return & refund policy", updated: "28 October 2026",
      intro: "Not the right fit? You can exchange or return your order. Here is how it works and how long each step takes.",
      body: "## Timeline at a glance\n- **Within 3 days of delivery:** report a damaged, defective or wrong item.\n- **Within 7 days of delivery:** request an exchange or return.\n- **Within 3 working days:** we check the returned item.\n- **Within 7–10 working days:** we send your refund after approval.\n\n## How to request a return or exchange\n1. Contact us through chat, the [Contact page](#contact) or by phone with your order number.\n2. Tell us the item, the reason and, for damaged items, send a photo.\n3. We confirm the request and arrange a pickup, or give you the return address.\n4. Pack the item unused, unwashed, with its tags and original packaging.\n5. Once we receive and check it, we send the exchange or refund.\n\n## Exchanges\n- You can exchange for another size or colour of the same price once per order, if it is in stock.\n- Exchange delivery is free if the mistake was ours. Otherwise the normal delivery charge applies.\n\n## Refunds\n- **Online payments** are refunded to the same card, mobile wallet or bank account through SSLCOMMERZ.\n- **Cash on delivery** orders are refunded by bKash, Nagad or bank transfer.\n- Your bank or wallet may take a few extra days to show the money.\n- Delivery charges are not refundable unless the item was damaged, defective or wrong.\n\n## You may not get a refund if\n- The request is made more than 7 days after delivery.\n- The item has been worn, washed, altered or damaged after delivery.\n- Tags or original packaging are missing.\n- The item was bought on clearance or marked final sale.\n\n## Cancelling an order\nYou can cancel any time before the order is shipped. Online payments for cancelled orders are refunded in full within 7–10 working days."
    },
    delivery: {
      title: "Delivery policy", updated: "28 October 2026",
      intro: "We deliver all over Bangladesh through trusted courier partners. Here are the charges, times and steps.",
      body: "## Delivery times and charges\n- **Inside Dhaka:** 1–3 days · ৳70\n- **Outside Dhaka:** 3–5 days · ৳130\n\nTimes are counted from when we confirm your order and may be longer during holidays, strikes or bad weather.\n\n## How delivery works\n1. **Order placed:** you get an order number on screen.\n2. **Confirmation:** we call or message you within 24 hours to confirm.\n3. **Packed and shipped:** we hand your parcel to the courier and share the tracking details.\n4. **Delivered:** the courier calls you before arriving. For cash on delivery, pay the rider when you receive the parcel.\n\n## Checking your parcel\nPlease check your parcel in front of the rider. If anything is damaged or wrong, tell the rider and contact us within 3 days.\n\n## If delivery fails\nIf we can't reach you after three tries, the parcel comes back to us and the order is cancelled. Online payments are refunded minus the delivery charge.\n\n## Tracking your order\nUse [Track order](#track) with your order number and phone number to see the latest status."
    }
  };

  // ---------------------------------------------------------------------------
  // Menus
  // ---------------------------------------------------------------------------
  var catLink = function (slug, label) { return { id: "mi_" + slug, label: label, url: "#category/" + slug, children: [] }; };
  var menus = {
    header: [
      { id: "mi_winter", label: "Winter 26/27", url: "#category/winter-collection", image: "assets/img/menu-winter.webp", children: [
        catLink("denim-shirt", "Denim Shirt"), catLink("sweat-shirt", "Sweat Shirt"), catLink("jacket", "Jacket"), catLink("denim-pant", "Denim Pant")
      ] },
      { id: "mi_summer", label: "Summer", url: "#category/summer", image: "assets/img/home/r-lb-1-m.webp", children: [
        catLink("full-shirt", "Full Sleeve Shirt"), catLink("half-shirt", "Half Sleeve Shirt")
      ] },
      { id: "mi_ethnic", label: "Ethnic Wear", url: "#category/ethnic-wear", image: "assets/img/home/r-lb-2-m.webp", children: [
        catLink("panjabi", "Panjabi"), catLink("payjama", "Payjama")
      ] },
      { id: "mi_sale", label: "On sale", url: "#category/on-sale", children: [] }
    ],
    footer: [
      { id: "fc_shop", title: "Shop", items: [
        { id: "f1", label: "Winter 26/27", url: "#category/winter-collection", children: [] }, { id: "f2", label: "Summer", url: "#category/summer", children: [] },
        { id: "f3", label: "Ethnic Wear", url: "#category/ethnic-wear", children: [] }, { id: "f4", label: "Premium Panjabi", url: "#category/panjabi", children: [] },
        { id: "f5", label: "On Sale", url: "#category/on-sale", children: [] }
      ] },
      { id: "fc_company", title: "Company", items: [
        { id: "f6", label: "About us", url: "#about", children: [] }, { id: "f7", label: "Contact us", url: "#contact", children: [] },
        { id: "f8", label: "Track order", url: "#track", children: [] }, { id: "f9", label: "Saved items", url: "#saved", children: [] },
        { id: "f_stores", label: "Store locations", url: "#store-locations", children: [] }, { id: "f_franchise", label: "Franchise", url: "#franchise", children: [] }
      ] },
      { id: "fc_policies", title: "Policies", items: [
        { id: "f10", label: "Terms & conditions", url: "#terms", children: [] }, { id: "f11", label: "Privacy policy", url: "#privacy", children: [] },
        { id: "f12", label: "Return & refund policy", url: "#refund", children: [] }, { id: "f13", label: "Delivery policy", url: "#delivery", children: [] }
      ] }
    ]
  };

  var coupons = [
    { id: "cpn_welcome", code: "WELCOME10", type: "percent", value: 10, minOrder: 1000, maxUses: 0, maxDiscount: 300, used: 0,
      startsAt: null, endsAt: null, active: true, description: "10% off your first order", createdAt: T0 }
  ];

  return {
    version: 2, settings: settings, categories: categories, attributes: attributes, products: products,
    pages: pages, menus: menus, coupons: coupons, counters: { order: 1000 }
  };
});
