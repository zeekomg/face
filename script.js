// Face Recognition Interactive Demo
class FaceRecognitionDemo {
    constructor() {
        this.isRunning = false;
        this.currentStep = 0;
        this.steps = [
            'تهيئة النظام...',
            'تشغيل الكاميرا...',
            'البحث عن الوجوه...',
            'تحليل الملامح...',
            'مطابقة البيانات...',
            'تسجيل الحضور...',
            'تم بنجاح!'
        ];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startBackgroundAnimations();
    }

    setupEventListeners() {
        // Tech stack hover effects
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => this.highlightTech(item));
            item.addEventListener('mouseleave', () => this.resetTech(item));
        });

        // Feature cards interactions
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('click', () => this.showFeatureDemo(card));
        });

        // Demo button
        const demoButton = document.querySelector('.demo-button');
        if (demoButton) {
            demoButton.addEventListener('click', () => this.startDemo());
        }
    }

    highlightTech(item) {
        const tech = item.dataset.tech;
        item.style.background = 'rgba(0, 255, 136, 0.2)';
        item.style.borderColor = '#00ff88';
        
        // Show tech info
        this.showTechInfo(tech);
    }

    resetTech(item) {
        item.style.background = 'rgba(255, 255, 255, 0.1)';
        item.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }

    showTechInfo(tech) {
        const techInfo = {
            python: 'لغة برمجة قوية ومرنة للذكاء الاصطناعي',
            opencv: 'مكتبة رؤية حاسوبية متقدمة',
            sql: 'قاعدة بيانات خفيفة وسريعة',
            lbph: 'خوارزمية التعرف على الوجوه',
            ssd: 'نموذج كشف الكائنات السريع'
        };

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.textContent = techInfo[tech];
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        }, 2000);
    }

    showFeatureDemo(card) {
        const feature = card.dataset.feature;
        const demos = {
            detection: this.runDetectionDemo.bind(this),
            recognition: this.runRecognitionDemo.bind(this),
            attendance: this.runAttendanceDemo.bind(this)
        };

        if (demos[feature]) {
            demos[feature]();
        }
    }

    runDetectionDemo() {
        const detectionArea = document.querySelector('.face-detection-area');
        const points = document.querySelectorAll('.point');
        
        // Highlight detection area
        detectionArea.style.border = '2px solid #00ff88';
        
        // Animate detection points
        points.forEach((point, index) => {
            setTimeout(() => {
                point.style.background = '#ff6b6b';
                point.style.transform = 'scale(1.5)';
                
                setTimeout(() => {
                    point.style.background = '#00ff88';
                    point.style.transform = 'scale(1)';
                }, 500);
            }, index * 200);
        });

        setTimeout(() => {
            detectionArea.style.border = 'none';
        }, 3000);
    }

    runRecognitionDemo() {
        const faceOutline = document.querySelector('.face-outline svg');
        const statusIndicator = document.querySelector('.status-indicator span');
        
        // Change status
        statusIndicator.textContent = 'جاري التعرف...';
        
        // Animate face outline
        faceOutline.style.stroke = '#00ff88';
        faceOutline.style.filter = 'drop-shadow(0 0 10px #00ff88)';
        
        setTimeout(() => {
            statusIndicator.textContent = 'تم التعرف بنجاح!';
            faceOutline.style.stroke = '#00d4aa';
        }, 2000);

        setTimeout(() => {
            statusIndicator.textContent = 'جاري المسح...';
            faceOutline.style.stroke = 'rgba(255,255,255,0.6)';
            faceOutline.style.filter = 'none';
        }, 4000);
    }

    runAttendanceDemo() {
        const statusIndicator = document.querySelector('.status-indicator span');
        const deviceScreen = document.querySelector('.device-screen');
        
        // Show attendance recording
        statusIndicator.textContent = 'تسجيل الحضور...';
        deviceScreen.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4aa 100%)';
        
        setTimeout(() => {
            statusIndicator.textContent = 'تم تسجيل الحضور!';
        }, 1500);

        setTimeout(() => {
            statusIndicator.textContent = 'جاري المسح...';
            deviceScreen.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 3500);
    }

    startDemo() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.currentStep = 0;
        
        const demoButton = document.querySelector('.demo-button');
        const statusIndicator = document.querySelector('.status-indicator span');
        
        demoButton.textContent = 'جاري التشغيل...';
        demoButton.disabled = true;
        
        this.runDemoStep();
    }

    runDemoStep() {
        if (this.currentStep >= this.steps.length) {
            this.endDemo();
            return;
        }

        const statusIndicator = document.querySelector('.status-indicator span');
        statusIndicator.textContent = this.steps[this.currentStep];
        
        // Special effects for each step
        switch (this.currentStep) {
            case 0: // تهيئة النظام
                this.animateSystemInit();
                break;
            case 1: // تشغيل الكاميرا
                this.animateCameraStart();
                break;
            case 2: // البحث عن الوجوه
                this.runDetectionDemo();
                break;
            case 3: // تحليل الملامح
                this.animateFeatureAnalysis();
                break;
            case 4: // مطابقة البيانات
                this.runRecognitionDemo();
                break;
            case 5: // تسجيل الحضور
                this.runAttendanceDemo();
                break;
            case 6: // تم بنجاح
                this.animateSuccess();
                break;
        }

        this.currentStep++;
        setTimeout(() => this.runDemoStep(), 2500);
    }

    animateSystemInit() {
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.background = 'rgba(0, 255, 136, 0.3)';
                setTimeout(() => {
                    item.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 500);
            }, index * 200);
        });
    }

    animateCameraStart() {
        const deviceScreen = document.querySelector('.device-screen');
        deviceScreen.style.animation = 'pulse 0.5s ease-in-out 3';
    }

    animateFeatureAnalysis() {
        const dataLines = document.querySelectorAll('.data-line');
        dataLines.forEach(line => {
            line.style.animationDuration = '0.5s';
        });
        
        setTimeout(() => {
            dataLines.forEach(line => {
                line.style.animationDuration = '2s';
            });
        }, 2000);
    }

    animateSuccess() {
        const deviceScreen = document.querySelector('.device-screen');
        const featureCards = document.querySelectorAll('.feature-card');
        
        deviceScreen.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4aa 100%)';
        
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.background = 'rgba(0, 255, 136, 0.3)';
                card.style.transform = 'translateY(-5px) scale(1.05)';
            }, index * 200);
        });
    }

    endDemo() {
        this.isRunning = false;
        
        const demoButton = document.querySelector('.demo-button');
        const statusIndicator = document.querySelector('.status-indicator span');
        const deviceScreen = document.querySelector('.device-screen');
        const featureCards = document.querySelectorAll('.feature-card');
        
        demoButton.innerHTML = '<span class="demo-icon">▶</span>تشغيل العرض التوضيحي';
        demoButton.disabled = false;
        statusIndicator.textContent = 'جاري المسح...';
        deviceScreen.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        
        featureCards.forEach(card => {
            card.style.background = 'rgba(255, 255, 255, 0.1)';
            card.style.transform = 'translateY(0) scale(1)';
        });
    }

    startBackgroundAnimations() {
        // Continuous floating animation for clouds
        const clouds = document.querySelectorAll('.cloud');
        clouds.forEach((cloud, index) => {
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                cloud.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 1000);
        });

        // Random tech item highlights
        setInterval(() => {
            const techItems = document.querySelectorAll('.tech-item');
            const randomItem = techItems[Math.floor(Math.random() * techItems.length)];
            
            randomItem.style.background = 'rgba(0, 255, 136, 0.2)';
            randomItem.style.borderColor = '#00ff88';
            
            setTimeout(() => {
                randomItem.style.background = 'rgba(255, 255, 255, 0.1)';
                randomItem.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }, 1000);
        }, 5000);
    }
}

// Utility functions
function createParticleEffect(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00ff88;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${x}px;
        top: ${y}px;
    `;
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    };
}

// Add click particle effects
document.addEventListener('click', (e) => {
    createParticleEffect(e.clientX, e.clientY);
});

// Initialize the demo when page loads
document.addEventListener('DOMContentLoaded', () => {
    new FaceRecognitionDemo();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Global demo function for button
function startDemo() {
    if (window.faceRecognitionDemo) {
        window.faceRecognitionDemo.startDemo();
    }
}

// Make demo instance globally available
document.addEventListener('DOMContentLoaded', () => {
    window.faceRecognitionDemo = new FaceRecognitionDemo();
});

