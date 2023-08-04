// Custome Element Creation File
const template = document.createElement("template");
template.innerHTML = `
<style>
@import '../styles.css';
</style>

    <div id="title-wrap" slot="title-wrap" class="flex w-full gap-x-12">
        <p
        class="relative before:absolute before:bg-alerticon before:block before:w-smicons before:h-smicons before:top-[-7px] before:left-[-1px] pl-7">
          ALPHA
        </p>
        <p class="">Important info regarding our service</p>

    </div>
    <a slot="extend-btn" id="hiddenInfoBtn" href="#"><img src="../img/arrow.svg" alt="arrow"></a>

    <div id="extendedHiddenInfo"
    class="hidden absolute h-96 w-full top-16 left-0 z-20 rounded-b-md  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-bglight">
        <div class="flex items-center justify-center h-full">
            <img class="block items-center w-cartcontent rounded" src="../img/tailwind_hidden_meme.jpg"
            alt="tailwind hidden meme">
            <p class="max-w-sm mx-18 text-lg text-left  ">...hidden info. Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Doloribus corporis voluptate cum suscipit totam ea! Hic nihil sint cumque, iure earum aperiam impedit? 
            Illo a recusandae ullam quo praesentium saepe.</p>
        </div>
    </div>
`;

class InfoDrop extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    let clone = template.content.cloneNode(true);

    shadowRoot.append(clone);

    // Find the elements in the shadow DOM
    const extendBtn = shadowRoot.querySelector('[slot="extend-btn"]');
    const extendedHiddenInfo = shadowRoot.querySelector("#extendedHiddenInfo");

    // Add event listener to the extend button
    extendBtn.addEventListener("click", () => {
      extendedHiddenInfo.classList.toggle("hidden");
    }); // Toggle the visibility of the extended info
  }
}

customElements.define("info-drop", InfoDrop);
