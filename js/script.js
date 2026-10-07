const header = document.querySelector(".l-header");
const floatingHeader = document.getElementById("floatingHeader");

const menuButton = document.getElementById("menuButton");
const drawer = document.getElementById("drawer");
const drawerClose = document.getElementById("drawerClose");
const drawerOverlay = document.getElementById("drawerOverlay");


// 通常ヘッダーが画面外に消えたら
// ロゴ＋ハンバーガーを出す

function updateFloatingHeader() {
    const headerHeight = header.offsetHeight;

    if (window.scrollY > headerHeight) {
        floatingHeader.classList.add("is-visible");
    } else {
        floatingHeader.classList.remove("is-visible");
    }
}

window.addEventListener("scroll", updateFloatingHeader);

updateFloatingHeader();


// ハンバーガーメニュー

function openDrawer() {
    drawer.classList.add("is-open");
    drawerOverlay.classList.add("is-open");

    menuButton.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";
}

function closeDrawer() {
    drawer.classList.remove("is-open");
    drawerOverlay.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
}

menuButton.addEventListener("click", openDrawer);

drawerClose.addEventListener("click", closeDrawer);

drawerOverlay.addEventListener("click", closeDrawer);


// メニュー内リンクを押すと閉じる

document.querySelectorAll(".l-drawer a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
});




const backToTop = document.querySelector(".c-back-to-top");
const footer = document.querySelector(".l-footer");


const gap = 32;

function updateBackToTop() {
    const headerHeight = header.offsetHeight;
    const buttonHeight = backToTop.offsetHeight;

    // ヘッダー付近では隠す
    if (window.scrollY <= headerHeight) {
        backToTop.classList.add("is-hidden");
    } else {
        backToTop.classList.remove("is-hidden");
    }

    // フッター上端のページ全体での位置
    const footerTop =
        footer.getBoundingClientRect().top + window.scrollY;

    // fixed状態のTOPボタン中央の位置
    const buttonCenter =
        window.scrollY +
        window.innerHeight -
        gap -
        buttonHeight / 2;

    // フッターまで来たら境界で停止
    if (buttonCenter >= footerTop) {
        backToTop.classList.add("is-stopped");
        backToTop.style.top =
            `${footerTop - buttonHeight / 2}px`;
    } else {
        backToTop.classList.remove("is-stopped");
        backToTop.style.top = "";
    }
}

window.addEventListener("scroll", updateBackToTop);
window.addEventListener("resize", updateBackToTop);

updateBackToTop();


// MENUカテゴリー横スクロール

const menuNav = document.querySelector(".p-menu__nav");

if (menuNav) {
    const menuNavArrows =
        document.querySelectorAll(".p-menu__nav-arrow");

    const leftArrow =
        document.querySelector('[data-direction="left"]');

    const rightArrow =
        document.querySelector('[data-direction="right"]');


    function updateMenuNavArrows() {
        const maxScroll =
            menuNav.scrollWidth - menuNav.clientWidth;

        leftArrow.hidden = menuNav.scrollLeft <= 1;

        rightArrow.hidden =
            menuNav.scrollLeft >= maxScroll - 1;
    }


    menuNavArrows.forEach((button) => {
        button.addEventListener("click", () => {

            const direction =
                button.dataset.direction === "right" ? 1 : -1;

            menuNav.scrollBy({
                left: 320 * direction,
                behavior: "smooth"
            });
        });
    });


    menuNav.addEventListener(
        "scroll",
        updateMenuNavArrows
    );

    window.addEventListener(
        "resize",
        updateMenuNavArrows
    );

    updateMenuNavArrows();
}