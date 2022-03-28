
// Dark Theme UI 
export class Keyboard {
    #swichEl;   
    #fontSelectEl;  
    #containerEl;
    #keboradEl;
    #inputGroupEl;
    #inputEl;

    constructor() {    
        this.#assignElement();
        this.#addEvent();
    }
    
    /**
     * 1. 저번시간에 작업한 코드 리팩토링
     * #containerEl 추가로 #swichEl, #fontSelectEl은 구지 document 단에서부터 #switch를 찾을필요없음
     * getElementById는 document에서만 사용할수 있기 때문에 querySelector로 바꿔고 id탐색으로 #추가
     */
    #assignElement() { 
        this.#containerEl = document.getElementById("container");
        this.#swichEl = this.#containerEl.querySelector("#switch");  
        this.#fontSelectEl = this.#containerEl.querySelector("#font");   
        this.#keboradEl = this.#containerEl.querySelector("#keyboard"); // #container엘리먼트 안의 #keyboard를 가져옴
        this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
        this.#inputEl = this.#inputGroupEl.querySelector("#input");
    }

    /**
     * 2. 보통 이벤트핸들러는 관리하기 쉽게 분리함
     * 이벤트핸들러를 분리해서 리팩토링
     */    
    #addEvent() {   
        this.#swichEl.addEventListener("change", this.#onChangeTheme);
        this.#fontSelectEl.addEventListener("change", this.#onChangeFont);

        // 3. Keyboard Event 적용
        // keydown 이벤트가 일어나면
        document.addEventListener("keydown", this.#onKeyDown.bind(this));
        document.addEventListener("keyup", this.#onKeyUp.bind(this));        
        this.#inputEl.addEventListener("input", this.#onInput);
    }

    #onInput(event) {
        // input에 입력이 발생할때마다 이벤트핸들러 동작하게해줌
        event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
    }

    #onKeyDown(event) {
        // 7. 한글 입력 불가 기능
        this.#inputGroupEl.classList.toggle(
            "error", 
            /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)   // 정규식 사용으로 한글검열
        );

        // 4. 이 keboardEl 엘리먼트에 event.code속성을 가지고 있는 셀렉터(data-code)을 찾아서 active 클래스를 붙혀라
        this.#keboradEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.add("active");
        // ^ 6. 글자자판 외에 기능키 입력 시 나오는 에러 처리법
        // ? 옵셔널체이닝사용. 원하는 요소를 찾지못하면 에러를 뱉지않고 undefinde를 리턴하고 함수를 실행하지않는다.
    }

    #onKeyUp(event) {
        // 5. 이 keboardEl 엘리먼트에 event.code속성을 가지고 있는 셀렉터(data-code)을 찾아서 remove 클래스
        this.#keboradEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.remove("active");
    }

    #onChangeTheme(event){
        document.documentElement.setAttribute(
            "theme",
            event.target.checked ? "dark-mode" : ""
        );
    }

    #onChangeFont(event){
        document.body.style.fontFamily = event.target.value;
    }
}




