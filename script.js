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

// 혜택 모달 관련 코드
document.addEventListener('DOMContentLoaded', function() {
    // 포인트 적립 모달
    const pointModal = document.getElementById('pointModal');
    const pointBtn = document.querySelector('.benefit-item:nth-child(1)');
    const pointCloseBtn = pointModal.querySelector('.close-modal');

    // 할인 혜택 모달
    const discountModal = document.getElementById('discountModal');
    const discountBtn = document.querySelector('.benefit-item:nth-child(3)');
    const discountCloseBtn = discountModal.querySelector('.close-modal');

    // 포인트 적립 모달 이벤트
    pointBtn.addEventListener('click', function() {
        pointModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    pointCloseBtn.addEventListener('click', function() {
        pointModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 할인 혜택 모달 이벤트
    discountBtn.addEventListener('click', function() {
        discountModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    discountCloseBtn.addEventListener('click', function() {
        discountModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target == pointModal) {
            pointModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target == discountModal) {
            discountModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 모달 내 멤버십 가입 버튼 클릭 이벤트
    const membershipButtons = document.querySelectorAll('.modal-button');
    membershipButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('멤버십 가입 페이지로 이동합니다.');
            // 실제 구현 시에는 멤버십 가입 페이지로 이동하는 코드 추가
        });
    });

    // 모달 애니메이션 효과
    const modals = document.querySelectorAll('.benefit-modal');
    modals.forEach(modal => {
        modal.addEventListener('show', function() {
            modal.querySelector('.benefit-modal-content').style.animation = 'modalSlideDown 0.4s ease-out';
        });
    });
}); 

// 네비게이션 활성화 관리
document.addEventListener('DOMContentLoaded', function() {
    // 현재 URL의 해시값 확인
    const updateActiveNav = () => {
        const hash = window.location.hash;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // 모든 링크의 active 클래스 제거
        navLinks.forEach(link => link.classList.remove('active'));
        
        // 현재 페이지 경로
        const currentPath = window.location.pathname;
        
        if (hash) {
            // 해시가 있는 경우 해당하는 네비게이션 링크 활성화
            navLinks.forEach(link => {
                if (link.getAttribute('href').includes(hash)) {
                    link.classList.add('active');
                }
            });
        } else {
            // 해시가 없는 경우 현재 페이지 경로에 따라 활성화
            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href').split('#')[0];
                if (currentPath.endsWith(linkPath) && linkPath !== '') {
                    link.classList.add('active');
                }
            });
        }
    };

    // 초기 로드 시 실행
    updateActiveNav();

    // 해시 변경 시 실행
    window.addEventListener('hashchange', updateActiveNav);
}); 

// 스크롤 위치에 따른 네비게이션 활성화
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // 스크롤 위치에 따라 현재 섹션 확인
    function getCurrentSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        for (const section of sections) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return section.id;
            }
        }

        // 스크롤이 최상단일 경우 홈 섹션으로 간주
        if (window.scrollY < window.innerHeight / 3) {
            return 'home';
        }

        return null;
    }

    // 네비게이션 링크 활성화 상태 업데이트
    function updateNavigation() {
        const currentSection = getCurrentSection();
        
        // 모든 링크의 active 클래스 제거
        navLinks.forEach(link => link.classList.remove('active'));
        
        // 현재 섹션에 해당하는 링크 활성화
        if (currentSection) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === 'index.html' && currentSection === 'home') {
                    link.classList.add('active');
                } else if (href.includes(`#${currentSection}`)) {
                    link.classList.add('active');
                }
            });
        }
    }

    // 스크롤 이벤트에 따른 네비게이션 업데이트
    window.addEventListener('scroll', updateNavigation);
    
    // 초기 로드 시 실행
    updateNavigation();
}); 