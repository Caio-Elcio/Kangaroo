function ativarAcc1() {
    acc1.classList.toggle('active');
    icd1.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% #a9ec9b;`
    icd2.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd3.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd4.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd5.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    if (pnl1.style.maxHeight != 0) {
        pnl1.style.maxHeight = null;
        icd1.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    } else {
        pnl1.style.maxHeight = pnl1.scrollHeight + 'px'
        pnl2.style.maxHeight = null;
        pnl3.style.maxHeight = null;
        pnl4.style.maxHeight = null;
        pnl5.style.maxHeight = null;
    }
}
function ativarAcc2() {
    acc2.classList.toggle('active');
    icd1.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd2.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% #a9ec9b;`
    icd3.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd4.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd5.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    if (pnl2.style.maxHeight != 0) {
        pnl2.style.maxHeight = null;
        icd2.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    } else {
        pnl1.style.maxHeight = null;
        pnl2.style.maxHeight = pnl2.scrollHeight + 'px';
        pnl3.style.maxHeight = null;
        pnl4.style.maxHeight = null;
        pnl5.style.maxHeight = null;
    }
}
function ativarAcc3() {
    acc3.classList.toggle('active');
    icd1.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd2.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd3.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% #a9ec9b;`
    icd4.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd5.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    if (pnl3.style.maxHeight != 0) {
        pnl3.style.maxHeight = null;
        icd3.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    } else {
        pnl1.style.maxHeight = null;
        pnl2.style.maxHeight = null;
        pnl3.style.maxHeight = pnl3.scrollHeight + 'px';
        pnl4.style.maxHeight = null;
        pnl5.style.maxHeight = null;
    }
}
function ativarAcc4() {
    acc4.classList.toggle('active');
    icd1.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd2.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd3.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd4.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% #a9ec9b;`
    icd5.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    if (pnl4.style.maxHeight != 0) {
        pnl4.style.maxHeight = null;
        icd4.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    } else {
        pnl1.style.maxHeight = null;
        pnl2.style.maxHeight = null;
        pnl3.style.maxHeight = null;
        pnl4.style.maxHeight = pnl4.scrollHeight + 'px';
        pnl5.style.maxHeight = null;
    }
}
function ativarAcc5() {
    acc5.classList.toggle('active');
    icd1.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd2.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd3.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd4.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    icd5.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% #a9ec9b;`
    if (pnl5.style.maxHeight != 0) {
        pnl5.style.maxHeight = null;
        icd5.style = `background: url(https://img.icons8.com/ios/452/minus.png) 1% 1% white`
    } else {
        pnl1.style.maxHeight = null;
        pnl2.style.maxHeight = null;
        pnl3.style.maxHeight = null;
        pnl4.style.maxHeight = null;
        pnl5.style.maxHeight = pnl5.scrollHeight + 'px';
    }
}