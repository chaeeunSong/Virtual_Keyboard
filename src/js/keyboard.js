
// Dark Theme UI 
export class Keyboard {
    #swichEl;   // 앞에 #(해시)를 붙히면 privite class, 클래스 외부에서 값을 변경해도 바뀌지 않음 (ES2019)
    constructor() {     // 생성자
        this.#assignElement();
        this.#addEvent();
    }
        
    #assignElement() {  // 엘리먼트를 가져온다
        this.#swichEl = document.getElementById("switch");  // html의 swich 엘리먼트를 가져옴
    }

    #addEvent() {   // 이벤트를 붙힌다
        // 이 스위치 엘리먼트가 change되는 이벤트가 일어나면
        this.#swichEl.addEventListener("change", (event) => {
            // HTML의 엘리먼트를 가져와 속성값을 정한다.
            document.documentElement.setAttribute(
                // setAttribute 의 첫번째 값은 속성 이름
                "theme",
                // setAttribute의 두번째 값은 속성 값 (attribute의 값은 뭘로 해줄건지)
                // 삼항연산자를 사용하여 chaecked 된 값이 true면 dark-mode, false면 빈 스트링("")
                event.target.checked ? "dark-mode" : ""
            );
            // 콘솔창에 일어난 이벤트 타겟의 checked 여부를 알려주세요
            console.log(event.target.checked);
        });
    }

}