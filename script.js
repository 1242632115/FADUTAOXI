// wig_photography_selector/frontend/script.js
document.addEventListener('DOMContentLoaded', function() {
    // 初始化存储对象
    if (!localStorage.getItem('wigSelections')) {
        localStorage.setItem('wigSelections', JSON.stringify({
            angle: [],
            style: [],
            hairdo: []
        }));
    }

    // 加载已保存的选择
    loadSelections();
});

// 切换选择状态
function toggleSelection(element, category) {
    element.classList.toggle('selected');
    updateLocalStorage(element, category);
}

// 更新本地存储
function updateLocalStorage(element, category) {
    const selections = JSON.parse(localStorage.getItem('wigSelections'));
    const index = selections[category].indexOf(element.querySelector('img').alt);
    
    if (index === -1) {
        selections[category].push(element.querySelector('img').alt);
    } else {
        selections[category].splice(index, 1);
    }
    
    localStorage.setItem('wigSelections', JSON.stringify(selections));
}

// 确认选择
function confirmCategorySelection(category) {
    const selections = JSON.parse(localStorage.getItem('wigSelections'));
    if (selections[category].length === 0) {
        return;
    }

    const container = document.getElementById(`${category}-container`);
    const cards = container.querySelectorAll('.card');

    cards.forEach(card => {
        const img = card.querySelector('img');
        card.style.display = selections[category].includes(img.alt) ? 'block' : 'none';
    });

    // 设置容器样式使卡片水平居中
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.flexWrap = 'wrap'; // 允许卡片换行
}

// 重置选择
function resetCategorySelection(category) {
    const container = document.getElementById(`${category}-container`);
    const cards = container.querySelectorAll('.card');
    
    // 显示所有卡片
    cards.forEach(card => {
        card.style.display = 'block';
        card.classList.remove('selected');
    });
    
    // 清空本地存储中的选择
    const selections = JSON.parse(localStorage.getItem('wigSelections'));
    selections[category] = [];
    localStorage.setItem('wigSelections', JSON.stringify(selections));

    // 移除设置容器宽度的代码
    // if (container.closest('.section-container')) {
    //     const sectionContainer = container.closest('.section-container');
    //     sectionContainer.style.width = '1800px';
    //     sectionContainer.style.maxWidth = '100%';
    //     sectionContainer.style.boxSizing = 'border-box';
    // }

    // 恢复容器的初始布局样式
    container.style.display = ''; // 清除之前设置的 flex 布局
    container.style.justifyContent = ''; 
    container.style.flexWrap = ''; 
}

// 加载已保存的选择
function loadSelections() {
    const selections = JSON.parse(localStorage.getItem('wigSelections'));
    
    for (const category in selections) {
        const container = document.getElementById(`${category}-container`);
        if (!container) continue;
        
        const cards = container.querySelectorAll('.card');
        cards.forEach(card => {
            const img = card.querySelector('img');
            if (selections[category].includes(img.alt)) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }
}

// 获取分类名称
function getCategoryName(category) {
    const names = {
        angle: '拍摄角度',
        style: '拍摄风格',
        hairdo: '打理造型'
    };
    return names[category] || category;
}

// 粒子效果初始化
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#4f46e5" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#8b5cf6", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
});