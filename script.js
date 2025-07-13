// 스크롤 애니메이션을 위한 Intersection Observer 설정
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate-active');
            scrollAnimationObserver.unobserve(entry.target); // 한 번 애니메이션이 실행된 후에는 관찰 중단
        }
    });
}, observerOptions);

// 페이지 로드 시 애니메이션 요소들을 관찰 대상으로 등록
document.addEventListener('DOMContentLoaded', () => {
    // 스크롤 애니메이션
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => scrollAnimationObserver.observe(el));

    // 메뉴 상세 정보 표시
    const menuItems = document.querySelectorAll('.new-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 닫기 버튼 클릭 시 이벤트 전파 중단
            if (e.target.classList.contains('close-details')) {
                e.stopPropagation();
                this.querySelector('.menu-info').classList.remove('active');
                return;
            }

            // 주문하기 버튼 클릭 시 이벤트 전파 중단
            if (e.target.classList.contains('order-button')) {
                e.stopPropagation();
                return;
            }

            const menuInfo = this.querySelector('.menu-info');
            
            // 다른 열린 메뉴 닫기
            document.querySelectorAll('.menu-info.active').forEach(info => {
                if (info !== menuInfo) {
                    info.classList.remove('active');
                }
            });

            // 현재 메뉴 토글
            menuInfo.classList.toggle('active');
        });
    });

    // 메뉴 카테고리 필터링
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성화된 버튼 스타일 변경
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            const menuItems = document.querySelectorAll('.new-menu-item');

            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    // 애니메이션 재실행을 위해 클래스 제거 후 추가
                    item.classList.remove('animate', 'fade-in-up');
                    setTimeout(() => {
                        item.classList.add('animate', 'fade-in-up');
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}); 

// 생일 무료 음료 팝업 관련 코드
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('birthdayModal');
    const closeBtn = document.querySelector('.close-modal');
    const freeDrinkBtn = document.querySelector('.free-drink-btn');
    
    // 무료 음료 버튼 클릭 시 모달 표시
    if (freeDrinkBtn) {
        freeDrinkBtn.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // 스크롤 방지
            }
        });
    }

    // 닫기 버튼 클릭 시 모달 닫기
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 스크롤 복원
        });
    }

    // 모달 외부 클릭 시 모달 닫기
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 스크롤 복원
        }
    });

    // 멤버십 가입 버튼 클릭 시 처리
    const membershipButtons = document.querySelectorAll('.modal-button');
    membershipButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 멤버십 페이지로 이동 (임시로 알림창 표시)
            alert('멤버십 가입 페이지로 이동합니다.');
        });
    });
}); 