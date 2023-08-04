/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        mobile: "390px",
        kmd: "820px",
        lg: "972px",
        xxl: "1320px",
      },
      colors: {
        bglight: "#FCF7E6",
        primary: "#000000",
        hover: "#FFFFFF",
        cartbg: "#1E1E1E",
      },
      fontFamily: {
        basefont: ["Space Grotesk"],
        pagfont: ["Inter"],
      },
      fontSize: {
        basic: ["14px", "10px"],
        beforetag: ["0.75rem", "0.7rem"],
      },
      width: {
        content: "1272px",
        test: "1000px",
        card: "300px",
        smcard: "74px",
        cart: "445px",
        cartcontent: "364px",
        smicons: "24px",
        pag: "39px",
        pagmin: "333px",
      },
      height: {
        headerh: "97.9px",
        card: "300px",
        smcard: "74px",
        smicons: "24px",
        pag: "39px",
      },
      spacing: {
        18: "18px",
        22: "22px",
        35: "35px",
        48: "48px",
        53: "53px",
        62: "62px",
        70: "70px",
        84: "84px",
        120: "120px",
      },
      backgroundImage: {
        alerticon: "url('/img/alert-circle.svg')",
      },
    },
  },
  variants: {},
  plugins: [],
};
