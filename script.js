// 스크롤 시 헤더 스타일 변경
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// 숫자 카운터 애니메이션
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

// Intersection Observer를 사용한 스크롤 애니메이션
const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");

            // 통계 섹션 카운터 애니메이션
            if (entry.target.classList.contains("stats")) {
                const statNumbers =
                    entry.target.querySelectorAll(".stat-number");
                statNumbers.forEach((stat) => {
                    const target = parseInt(stat.getAttribute("data-target"));
                    animateCounter(stat, target);
                });
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 관찰할 요소들
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
    observer.observe(section);
});

// Business 섹션 카테고리 아이템 슬라이드 애니메이션
const categoryObserverOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
};

const categoryObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const index = Array.from(entry.target.parentNode.children).indexOf(
                entry.target
            );

            // 짝수 인덱스는 왼쪽에서, 홀수 인덱스는 오른쪽에서
            if (index % 2 === 0) {
                entry.target.classList.add("slide-in-left");
            } else {
                entry.target.classList.add("slide-in-right");
            }

            categoryObserver.unobserve(entry.target);
        }
    });
}, categoryObserverOptions);

// 비즈니스 섹션의 카테고리 아이템들 관찰
const categoryItems = document.querySelectorAll(".category-item");
categoryItems.forEach((item) => {
    categoryObserver.observe(item);
});

// 비즈니스 카드 클릭 이벤트
document.querySelectorAll(".business-card").forEach((card) => {
    card.addEventListener("click", function () {
        const title = this.querySelector("h3").textContent;
        alert(`${title}에 대해 더 자세한 정보를 준비 중입니다.`);
    });
});

// 뉴스 카드 클릭 이벤트
document.querySelectorAll(".news-card").forEach((card) => {
    card.addEventListener("click", function () {
        const title = this.querySelector("h3").textContent;
        alert(`${title} 기사를 준비 중입니다.`);
    });
});

// 모바일 메뉴 토글
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const nav = document.querySelector(".nav");

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
        nav.style.display = nav.style.display === "block" ? "none" : "block";
        this.classList.toggle("active");
    });
}

// 로그인/회원가입 버튼
document.querySelector(".btn-login")?.addEventListener("click", function () {
    alert("로그인 페이지로 이동합니다.");
});

document.querySelector(".btn-join")?.addEventListener("click", function () {
    alert("회원가입 페이지로 이동합니다.");
});

// 채용 버튼
document.querySelector(".btn-careers")?.addEventListener("click", function () {
    alert("채용 페이지로 이동합니다.");
});

// 비즈니스 상세 버튼
document.querySelectorAll(".btn-business").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const card = this.closest(".business-card");
        const title = card.querySelector("h3").textContent;
        alert(`${title} 상세 페이지로 이동합니다.`);
    });
});

// 페이지 로드 시 스크롤 위치 초기화
window.addEventListener("load", function () {
    window.scrollTo(0, 0);
});

// 스크롤 진행률 표시 (선택사항)
function updateScrollProgress() {
    const scrollTotal =
        document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
}

window.addEventListener("scroll", updateScrollProgress);

// 이미지 레이지 로딩 (이미지 추가 시 사용)
if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll("img.lazy").forEach((img) => {
        imageObserver.observe(img);
    });
}

// 폼 검증 (문의 폼 추가 시 사용)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 로컬 스토리지 활용 (방문자 추적)
let visitCount = localStorage.getItem("visitCount") || 0;
visitCount++;
localStorage.setItem("visitCount", visitCount);
console.log("방문 횟수:", visitCount);

// 다크모드 토글 (선택사항)
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
}

// 페이지 로드 시 다크모드 설정 복원
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// 파트너 로고 호버 효과
document.querySelectorAll(".partner-logo").forEach((logo) => {
    logo.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px) scale(1.05)";
    });

    logo.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
    });
});

// 타임라인 아이템 애니메이션
const timelineObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateX(0)";
                }, index * 100);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll(".timeline-item").forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = "all 0.5s ease";
    timelineObserver.observe(item);
});

// 키보드 네비게이션
document.addEventListener("keydown", function (e) {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === "Escape" && nav.style.display === "block") {
        nav.style.display = "none";
        mobileMenuBtn.classList.remove("active");
    }
});

// 성능 최적화: 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 리사이즈 이벤트 최적화
const handleResize = debounce(function () {
    console.log("Window resized");
    // 리사이즈 시 필요한 로직
}, 250);

window.addEventListener("resize", handleResize);

// 페이지 언로드 시 정리
window.addEventListener("beforeunload", function () {
    // 필요한 정리 작업
    console.log("페이지를 떠납니다.");
});

console.log("POINTGROUD 홈페이지가 로드되었습니다.");
