function initZoomSlider() {
    const zoomSlider = document.getElementById('zoom-slider');
    const actionButtons = document.getElementById('zoom-action-buttons');
    const saveBtn = document.getElementById('save-zoom-btn');
    const cancelBtn = document.getElementById('cancel-zoom-btn');
    if (!zoomSlider || !actionButtons) return;

    let initialZoomValue = parseInt(zoomSlider.value);
    let currentZoomValue = initialZoomValue;
    const sliderFill = document.getElementById('slider-fill');
    
    const savedZoom = localStorage.getItem('zoomValue');
    if (savedZoom) {
        zoomSlider.value = savedZoom;
        initialZoomValue = parseInt(savedZoom);
        currentZoomValue = initialZoomValue;
    }

    function updateSliderBackground() {
        const value = parseInt(zoomSlider.value);
        if (sliderFill) {
            sliderFill.style.width = value + '%';
        }
    }

    function handleSliderChange() {
        currentZoomValue = parseInt(zoomSlider.value);
        updateSliderBackground();
        if (currentZoomValue !== initialZoomValue) {
            actionButtons.style.display = 'flex';
        } else {
            actionButtons.style.display = 'none';
        }
    }

    updateSliderBackground();

    function saveZoomChanges() {
        localStorage.setItem('zoomValue', currentZoomValue.toString());
        initialZoomValue = currentZoomValue;
        actionButtons.style.display = 'none';
        window.location.href = 'gesture-panel.html';
    }

    function cancelZoomChanges() {
        zoomSlider.value = initialZoomValue;
        currentZoomValue = initialZoomValue;
        actionButtons.style.display = 'none';
        window.location.href = 'gesture-panel.html';
    }

    zoomSlider.addEventListener('input', handleSliderChange);
    zoomSlider.addEventListener('change', handleSliderChange);
    if (saveBtn) saveBtn.addEventListener('click', saveZoomChanges);
    if (cancelBtn) cancelBtn.addEventListener('click', cancelZoomChanges);
}

let screenshotCounterInterval = null;

function initScreenshotTimer() {
    const timeOptionBtns = document.querySelectorAll('.time-option-btn');
    const customTimeBtn = document.getElementById('custom-time-btn');
    const customTimeInput = document.getElementById('custom-time-input');
    const customTimeValue = document.getElementById('custom-time-value');
    const actionButtons = document.getElementById('screenshot-action-buttons');
    const acceptBtn = document.getElementById('accept-screenshot-btn');
    const cancelBtn = document.getElementById('cancel-screenshot-btn');

    if (!timeOptionBtns.length) return;

    function startTimer(time) {
        console.log('Iniciando contador:', time, 'segundos');
        const startTime = Date.now();
        localStorage.setItem('screenshotTimer', time.toString());
        localStorage.setItem('screenshotTimerStart', startTime.toString());
        localStorage.setItem('screenshotTimerActive', 'true');
        window.location.href = 'home.html';
    }

    timeOptionBtns.forEach(btn => {
        if (btn !== customTimeBtn) {
            btn.addEventListener('click', function() {
                const time = parseInt(btn.getAttribute('data-time'));
                startTimer(time);
            });
        }
    });

    if (customTimeBtn) {
        customTimeBtn.addEventListener('click', function() {
            if (actionButtons) actionButtons.style.display = 'flex';
            if (customTimeInput) customTimeInput.style.display = 'block';
            if (customTimeValue) customTimeValue.focus();
        });
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            const customValue = parseInt(customTimeValue.value);
            if (customValue && customValue > 0) {
                startTimer(customValue);
            } else {
                alert('Ingresa un tiempo vÃ¡lido en segundos');
            }
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            window.location.href = 'gesture-panel.html';
        });
    }
}

function initScreenshotCounter() {
    const timerActive = localStorage.getItem('screenshotTimerActive');
    const timerValue = localStorage.getItem('screenshotTimer');
    const timerStart = localStorage.getItem('screenshotTimerStart');

    if (timerActive !== 'true' || !timerValue || !timerStart) {
        return;
    }

    const totalSeconds = parseInt(timerValue);
    const startTime = parseInt(timerStart);
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    let remainingSeconds = totalSeconds - elapsedSeconds;

    if (remainingSeconds <= 0) {
        alert('Se tomo la captura');
        localStorage.removeItem('screenshotTimerActive');
        localStorage.removeItem('screenshotTimer');
        localStorage.removeItem('screenshotTimerStart');
        return;
    }

    console.log('Contador iniciado:', remainingSeconds, 'segundos restantes');

    if (screenshotCounterInterval) {
        clearInterval(screenshotCounterInterval);
    }

    screenshotCounterInterval = setInterval(function() {
        const currentStart = parseInt(localStorage.getItem('screenshotTimerStart'));
        const currentTotal = parseInt(localStorage.getItem('screenshotTimer'));
        
        if (!currentStart || !currentTotal) {
            clearInterval(screenshotCounterInterval);
            return;
        }

        const elapsed = Math.floor((Date.now() - currentStart) / 1000);
        remainingSeconds = currentTotal - elapsed;
        
        console.log('Tiempo restante:', remainingSeconds, 'segundos');
        
        if (remainingSeconds <= 0) {
            clearInterval(screenshotCounterInterval);
            alert('Se tomo la captura');
            localStorage.removeItem('screenshotTimerActive');
            localStorage.removeItem('screenshotTimer');
            localStorage.removeItem('screenshotTimerStart');
        }
    }, 1000);
}

function getCursors() {
    const cursors = localStorage.getItem('cursors');
    return cursors ? JSON.parse(cursors) : [];
}

function saveCursors(cursors) {
    localStorage.setItem('cursors', JSON.stringify(cursors));
}

function initCursorList() {
    const container = document.getElementById('cursor-list-container');
    const addBtn = document.getElementById('add-cursor-btn');
    if (!container) return;

    function renderCursors() {
        const cursors = getCursors();
        container.innerHTML = '';
        
        cursors.forEach((cursor, index) => {
            const item = document.createElement('div');
            item.className = 'cursor-item';
            
            const label = document.createElement('div');
            label.className = 'cursor-item-label';
            label.textContent = 'CURSOR ' + (index + 1);
            
            const button = document.createElement('button');
            button.className = 'cursor-item-button';
            button.textContent = cursor.name || 'Sin nombre';
            button.addEventListener('click', function() {
                localStorage.setItem('selectedCursorIndex', index.toString());
                window.location.href = 'cursor-details.html';
            });
            
            item.appendChild(label);
            item.appendChild(button);
            container.appendChild(item);
        });
    }

    if (addBtn) {
        addBtn.addEventListener('click', function() {
            window.location.href = 'cursor-add.html';
        });
    }

    renderCursors();
}

function initCursorDetails() {
    const title = document.getElementById('cursor-title');
    const nameLarge = document.getElementById('cursor-name-large');
    const velocity = document.getElementById('cursor-velocity');
    const sensitivity = document.getElementById('cursor-sensitivity');
    const selectionTime = document.getElementById('cursor-selection-time');
    const useBtn = document.getElementById('use-cursor-btn');
    const deleteBtn = document.getElementById('delete-cursor-btn');

    const cursorIndex = parseInt(localStorage.getItem('selectedCursorIndex'));
    const cursors = getCursors();
    
    if (cursorIndex === null || !cursors[cursorIndex]) {
        window.location.href = 'cursor-list.html';
        return;
    }

    const cursor = cursors[cursorIndex];

    if (title) title.textContent = 'CURSOR ' + (cursorIndex + 1);
    if (nameLarge) nameLarge.textContent = cursor.name || 'Sin nombre';
    if (velocity) velocity.textContent = cursor.velocity + '%';
    if (sensitivity) sensitivity.textContent = cursor.sensitivity + '%';
    if (selectionTime) selectionTime.textContent = cursor.reactionTime + '%';

    if (useBtn) {
        useBtn.addEventListener('click', function() {
            localStorage.setItem('activeCursor', JSON.stringify(cursor));
            alert('Cursor activado');
        });
    }

    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            if (confirm('Â¿Eliminar este cursor?')) {
                cursors.splice(cursorIndex, 1);
                saveCursors(cursors);
                window.location.href = 'cursor-list.html';
            }
        });
    }
}

function initCursorAdd() {
    const velocitySlider = document.getElementById('velocity-slider');
    const sensitivitySlider = document.getElementById('sensitivity-slider');
    const reactionSlider = document.getElementById('reaction-slider');
    const velocityFill = document.getElementById('velocity-fill');
    const sensitivityFill = document.getElementById('sensitivity-fill');
    const reactionFill = document.getElementById('reaction-fill');
    const nameInput = document.getElementById('cursor-name-input');
    const saveBtn = document.getElementById('save-cursor-btn');
    const cancelBtn = document.getElementById('cancel-cursor-btn');

    function updateSlider(slider, fill) {
        if (slider && fill) {
            const value = parseInt(slider.value);
            fill.style.width = value + '%';
        }
    }

    if (velocitySlider && velocityFill) {
        updateSlider(velocitySlider, velocityFill);
        velocitySlider.addEventListener('input', function() {
            updateSlider(velocitySlider, velocityFill);
        });
    }

    if (sensitivitySlider && sensitivityFill) {
        updateSlider(sensitivitySlider, sensitivityFill);
        sensitivitySlider.addEventListener('input', function() {
            updateSlider(sensitivitySlider, sensitivityFill);
        });
    }

    if (reactionSlider && reactionFill) {
        updateSlider(reactionSlider, reactionFill);
        reactionSlider.addEventListener('input', function() {
            updateSlider(reactionSlider, reactionFill);
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const name = nameInput ? nameInput.value.trim() : '';
            if (!name) {
                alert('Ingresa un nombre para el cursor');
                return;
            }

            const cursor = {
                name: name,
                velocity: parseInt(velocitySlider.value),
                sensitivity: parseInt(sensitivitySlider.value),
                reactionTime: parseInt(reactionSlider.value)
            };

            const cursors = getCursors();
            cursors.push(cursor);
            saveCursors(cursors);
            window.location.href = 'cursor-list.html';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            window.location.href = 'cursor-list.html';
        });
    }
}

function getProfileData() {
    const profile = localStorage.getItem('profileData');
    if (profile) {
        return JSON.parse(profile);
    }
    return {
        nombre: 'Miguel',
        apellidos: 'GarcÃ­a LÃ³pez',
        correo: 'miguel.garcia@example.com',
        telefono: '+34 600 123 456'
    };
}

function saveProfileData(data) {
    localStorage.setItem('profileData', JSON.stringify(data));
}

function initProfile() {
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const correo = document.getElementById('correo');
    const telefono = document.getElementById('telefono');

    const profile = getProfileData();

    if (nombre) nombre.value = profile.nombre;
    if (apellidos) apellidos.value = profile.apellidos;
    if (correo) correo.value = profile.correo;
    if (telefono) telefono.value = profile.telefono;
}

function initEditProfile() {
    const nombreInput = document.getElementById('edit-nombre');
    const apellidosInput = document.getElementById('edit-apellidos');
    const correoInput = document.getElementById('edit-correo');
    const telefonoInput = document.getElementById('edit-telefono');
    const saveBtn = document.getElementById('save-profile-btn');
    const cancelBtn = document.getElementById('cancel-profile-btn');

    const profile = getProfileData();

    if (nombreInput) nombreInput.value = profile.nombre;
    if (apellidosInput) apellidosInput.value = profile.apellidos;
    if (correoInput) correoInput.value = profile.correo;
    if (telefonoInput) telefonoInput.value = profile.telefono;

    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const newProfile = {
                nombre: nombreInput ? nombreInput.value.trim() : profile.nombre,
                apellidos: apellidosInput ? apellidosInput.value.trim() : profile.apellidos,
                correo: profile.correo,
                telefono: telefonoInput ? telefonoInput.value.trim() : profile.telefono
            };

            if (!newProfile.nombre || !newProfile.apellidos) {
                alert('Por favor completa todos los campos');
                return;
            }

            saveProfileData(newProfile);
            window.location.href = 'profile.html';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }
}

function getAlerts() {
    const alerts = localStorage.getItem('alerts');
    if (alerts) {
        return JSON.parse(alerts);
    }
    return [
        { title: 'Alerta enviada', date: '25/02/2025' },
        { title: 'Ocurrio un problema', date: '25/02/2025' },
        { title: 'Sistema actualizado', date: '24/02/2025' },
        { title: 'Nueva configuraciÃ³n guardada', date: '23/02/2025' },
        { title: 'Alerta de seguridad', date: '22/02/2025' },
        { title: 'Cambio de perfil', date: '21/02/2025' }
    ];
}

function initAlerts() {
    const container = document.getElementById('alerts-list-container');
    const pagination = document.getElementById('alerts-pagination');
    const pageNumber = document.getElementById('page-number');
    if (!container || !pagination) return;

    const alerts = getAlerts();
    const itemsPerPage = 6;
    let currentPage = 1;
    const totalPages = Math.ceil(alerts.length / itemsPerPage);

    function renderAlerts() {
        container.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageAlerts = alerts.slice(start, end);

        pageAlerts.forEach(alert => {
            const card = document.createElement('div');
            card.className = 'alert-card';
            
            const title = document.createElement('div');
            title.className = 'alert-title';
            title.textContent = alert.title;
            
            const date = document.createElement('div');
            date.className = 'alert-date';
            date.textContent = alert.date;
            
            card.appendChild(title);
            card.appendChild(date);
            container.appendChild(card);
        });

        if (pageNumber) {
            pageNumber.textContent = 'pag ' + currentPage;
        }
    }

    function renderPagination() {
        pagination.innerHTML = '';
        
        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                const number = document.createElement('button');
                number.className = 'pagination-number';
                if (i === currentPage) {
                    number.classList.add('active');
                }
                number.textContent = i;
                number.addEventListener('click', function() {
                    currentPage = i;
                    renderAlerts();
                    renderPagination();
                });
                pagination.appendChild(number);
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                pagination.appendChild(ellipsis);
            }
        }

        if (currentPage < totalPages) {
            const nextArrow = document.createElement('button');
            nextArrow.className = 'pagination-arrow';
            nextArrow.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
            nextArrow.addEventListener('click', function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderAlerts();
                    renderPagination();
                }
            });
            pagination.appendChild(nextArrow);
        }
    }

    renderAlerts();
    renderPagination();
}

function getNotifications() {
    const notifications = localStorage.getItem('notifications');
    if (notifications) {
        return JSON.parse(notifications);
    }
    return [
        { id: 1, text: 'Nueva actualizaciÃ³n disponible para Blink Click', url: 'https://www.bbc.com/news' },
        { id: 2, text: 'Tu perfil ha sido actualizado correctamente', url: 'https://www.bbc.com/news' },
        { id: 3, text: 'Se ha completado la calibraciÃ³n visual', url: 'https://www.bbc.com/news' },
        { id: 4, text: 'Recordatorio: Revisa tu configuraciÃ³n de descanso', url: 'https://www.bbc.com/news' },
        { id: 5, text: 'Nuevo cursor personalizado guardado', url: 'https://www.bbc.com/news' }
    ];
}

function saveNotifications(notifications) {
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

function initNotifications() {
    const container = document.getElementById('notifications-list-container');
    if (!container) return;

    function renderNotifications() {
        const notifications = getNotifications();
        container.innerHTML = '';

        if (notifications.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'notification-card';
            empty.style.textAlign = 'center';
            empty.textContent = 'No hay notificaciones';
            container.appendChild(empty);
            return;
        }

        notifications.forEach(notification => {
            const card = document.createElement('div');
            card.className = 'notification-card';

            const text = document.createElement('div');
            text.className = 'notification-text';
            text.textContent = notification.text;

            const actions = document.createElement('div');
            actions.className = 'notification-actions';

            const accessBtn = document.createElement('button');
            accessBtn.className = 'notification-access-btn';
            accessBtn.textContent = 'Acceder';
            accessBtn.addEventListener('click', function() {
                window.open(notification.url, '_blank');
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'notification-delete-btn';
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', function() {
                const currentNotifications = getNotifications();
                const updated = currentNotifications.filter(n => n.id !== notification.id);
                saveNotifications(updated);
                renderNotifications();
            });

            actions.appendChild(accessBtn);
            actions.appendChild(deleteBtn);

            card.appendChild(text);
            card.appendChild(actions);
            container.appendChild(card);
        });
    }

    renderNotifications();
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'zoom.html') initZoomSlider();
    if (currentPage === 'screenshot.html') initScreenshotTimer();
    if (currentPage === 'cursor-list.html') initCursorList();
    if (currentPage === 'cursor-details.html') initCursorDetails();
    if (currentPage === 'cursor-add.html') initCursorAdd();
    if (currentPage === 'profile.html') initProfile();
    if (currentPage === 'edit-profile.html') initEditProfile();
    if (currentPage === 'alerts.html') initAlerts();
    if (currentPage === 'notifications.html') initNotifications();
    initScreenshotCounter();
});
// ============================================
// BLINK CLICK - ARCHIVO JAVASCRIPT PRINCIPAL
// ============================================

// Esperar a que el DOM estÃ© listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funciones segÃºn la pÃ¡gina actual
    const currentPage = window.location.pathname.split('/').pop() || window.location.href.split('/').pop();
    
    // Detectar quÃ© pÃ¡gina es y ejecutar su funciÃ³n correspondiente
    if (currentPage === 'ajuste-icono.html' || currentPage.includes('ajuste-icono')) {
        initAjusteIcono();
    }
    
    if (currentPage === 'calibracion-puntos.html' || currentPage.includes('calibracion-puntos')) {
        initCalibracionPuntos();
    }
    
    if (currentPage === 'agregar-acceso.html' || currentPage.includes('agregar-acceso')) {
        initAgregarAcceso();
    }
    
    if (currentPage === 'home.html' || currentPage === '' || currentPage.includes('home')) {
        initHome();
    }
    
    if (currentPage === 'accesses.html' || currentPage.includes('accesses')) {
        initAccesses();
    }
    
    if (currentPage === 'sos-alerta.html' || currentPage.includes('sos-alerta')) {
        // Las funciones ya estÃ¡n definidas globalmente
    }
    
    if (currentPage === 'success-save.html' || currentPage.includes('success-save')) {
        initSuccessSave();
    }
    
    if (currentPage === 'guide.html' || currentPage.includes('guide')) {
        initGuide();
    }
    
    if (currentPage === 'security.html' || currentPage.includes('security')) {
        // Las funciones ya estÃ¡n definidas globalmente
    }
    
    if (currentPage === 'report.html' || currentPage.includes('report')) {
        initReport();
    }
    
    if (currentPage === 'eliminar-acceso.html' || currentPage.includes('eliminar-acceso')) {
        initEliminarAcceso();
    }
    
    if (currentPage === 'calibration.html' || currentPage.includes('calibration')) {
        initCalibration();
    }
});

// ============================================
// AJUSTE DE ICONO
// ============================================
function initAjusteIcono() {
    const sizeBtns = document.querySelectorAll('.ajuste-tamano-btn');
    const iconos = document.querySelectorAll('.icono-ajuste');
    const sizeMap = { xs: 30, sm: 45, md: 60, lg: 75, xl: 90 };
    
    sizeBtns.forEach(btn => {
        btn.onclick = function() {
            sizeBtns.forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');
            const px = sizeMap[btn.dataset.size] || 60;
            iconos.forEach(ic => {
                ic.style.width = px + 'px';
                ic.style.height = px + 'px';
            });
        };
    });
}

// ============================================
// CALIBRACIÃ“N DE PUNTOS
// ============================================
function initCalibracionPuntos() {
    // ConfiguraciÃ³n de puntos: posiciÃ³n (x%, y%) y color inicial
    const puntosConfig = [
        { x: 15, y: 20, color: 'amarillo' },
        { x: 85, y: 15, color: 'amarillo' },
        { x: 20, y: 50, color: 'amarillo' },
        { x: 80, y: 45, color: 'amarillo' },
        { x: 10, y: 80, color: 'amarillo' },
        { x: 50, y: 25, color: 'rojo' },
        { x: 50, y: 60, color: 'rojo' },
        { x: 90, y: 75, color: 'rojo' }
    ];

    const container = document.getElementById('calibracion-container');
    if (!container) return;
    
    const puntos = [];
    let puntosCompletados = 0;
    const totalPuntos = puntosConfig.length;

    // Crear los puntos
    puntosConfig.forEach((config, index) => {
        const punto = document.createElement('div');
        punto.className = `punto-calibracion punto-${config.color}`;
        punto.style.left = `${config.x}%`;
        punto.style.top = `${config.y}%`;
        punto.dataset.index = index;
        punto.dataset.completado = 'false';
        
        // Evento cuando el cursor pasa sobre el punto
        punto.addEventListener('mouseenter', function() {
            if (this.dataset.completado === 'false') {
                this.classList.remove('punto-amarillo', 'punto-rojo');
                this.classList.add('punto-verde');
                this.dataset.completado = 'true';
                puntosCompletados++;
                
                // Verificar si todos los puntos estÃ¡n completados
                if (puntosCompletados === totalPuntos) {
                    // Guardar la fecha y hora de la calibraciÃ³n completada
                    const fechaCalibracion = new Date().toISOString();
                    localStorage.setItem('ultimaCalibracion', fechaCalibracion);
                    
                    const instruccion = document.getElementById('instruccion');
                    if (instruccion) {
                        instruccion.textContent = 'Â¡CalibraciÃ³n completada!';
                    }
                    
                    setTimeout(() => {
                        window.location.href = 'success-save.html?return=calibration.html';
                    }, 1000);
                }
            }
        });
        
        container.appendChild(punto);
        puntos.push(punto);
    });
}

// ============================================
// AGREGAR ACCESO DIRECTO
// ============================================
function initAgregarAcceso() {
    const btnGuardar = document.getElementById('btn-guardar');
    const urlInput = document.getElementById('url-acceso');
    
    if (!btnGuardar || !urlInput) return;
    
    // FunciÃ³n para extraer el dominio de una URL
    function obtenerDominio(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch (e) {
            return null;
        }
    }

    // FunciÃ³n para obtener la URL del favicon
    function obtenerFaviconUrl(url) {
        const dominio = obtenerDominio(url);
        if (!dominio) return null;
        
        // Usar el servicio de Google para obtener favicons
        return `https://www.google.com/s2/favicons?domain=${dominio}&sz=128`;
    }

    // Detectar automÃ¡ticamente el favicon cuando se ingresa una URL
    urlInput.addEventListener('blur', function() {
        const url = this.value.trim();
        if (url) {
            try {
                new URL(url);
                const faviconUrl = obtenerFaviconUrl(url);
                if (faviconUrl) {
                    // Mostrar vista previa
                    const previewDiv = document.getElementById('icono-preview');
                    const previewImg = document.getElementById('preview-img');
                    if (previewDiv && previewImg) {
                        previewImg.src = faviconUrl;
                        previewDiv.style.display = 'block';
                    }
                }
            } catch (e) {
                // URL invÃ¡lida, no hacer nada
            }
        }
    });

    // FunciÃ³n para guardar el acceso directo
    btnGuardar.addEventListener('click', function() {
        const nombre = document.getElementById('nombre-acceso').value.trim();
        const url = urlInput.value.trim();

        // ValidaciÃ³n bÃ¡sica
        if (!nombre || !url) {
            alert('Por favor, completa todos los campos obligatorios');
            return;
        }

        // Validar URL
        try {
            new URL(url);
        } catch (e) {
            alert('Por favor, ingresa una URL vÃ¡lida (ej: https://www.ejemplo.com)');
            return;
        }

        // Obtener favicon automÃ¡ticamente
        const faviconUrl = obtenerFaviconUrl(url);
        const icono = faviconUrl || 'apps/app-default.png';

        // Obtener accesos existentes del localStorage
        let accesos = JSON.parse(localStorage.getItem('accesosDirectos') || '[]');

        // Agregar nuevo acceso
        const nuevoAcceso = {
            id: Date.now(),
            nombre: nombre,
            url: url,
            icono: icono
        };

        accesos.push(nuevoAcceso);

        // Guardar en localStorage
        localStorage.setItem('accesosDirectos', JSON.stringify(accesos));

        // Redirigir a home.html
        window.location.href = 'home.html';
    });
}

// ============================================
// HOME - CARGAR ACCESOS DIRECTOS
// ============================================
function initHome() {
    cargarAccesosDirectos();
}

// ============================================
// ACCESSES - CARGAR ACCESOS DIRECTOS
// ============================================
function initAccesses() {
    cargarAccesosDirectos();
}

// FunciÃ³n compartida para cargar accesos directos
function cargarAccesosDirectos() {
    const accesos = JSON.parse(localStorage.getItem('accesosDirectos') || '[]');
    const container = document.getElementById('accesos-container');
    if (!container) return;
    
    const botonAgregar = container.querySelector('a[href="agregar-acceso.html"]') || 
                         container.querySelector('a[href*="agregar"]');

    // Limpiar accesos dinÃ¡micos anteriores (si existen)
    const accesosDinamicos = container.querySelectorAll('.acceso-dinamico');
    accesosDinamicos.forEach(acceso => acceso.remove());

    // Agregar cada acceso guardado antes del botÃ³n "Agregar"
    accesos.forEach(acceso => {
        // Crear contenedor para el acceso (para poder agregar botÃ³n eliminar en accesses.html)
        const accesoWrapper = document.createElement('div');
        accesoWrapper.className = 'acceso-dinamico-wrapper';
        accesoWrapper.style.position = 'relative';
        accesoWrapper.style.display = 'inline-block';
        
        const nuevoAcceso = document.createElement('a');
        nuevoAcceso.href = acceso.url;
        nuevoAcceso.target = '_blank';
        nuevoAcceso.className = 'quick-access-btn acceso-dinamico';
        nuevoAcceso.title = acceso.nombre;
        nuevoAcceso.dataset.accesoId = acceso.id;
        
        const img = document.createElement('img');
        img.src = acceso.icono;
        img.alt = acceso.nombre;
        img.style.objectFit = 'contain';
        img.onerror = function() {
            // Si el icono no se encuentra, intentar obtener el favicon automÃ¡ticamente
            if (acceso.url && acceso.icono && acceso.icono.includes('google.com/s2/favicons')) {
                // Ya es un favicon de Google, usar icono por defecto
                this.src = 'apps/app-default.png';
            } else if (acceso.url) {
                // Intentar obtener el favicon del dominio
                try {
                    const urlObj = new URL(acceso.url);
                    const dominio = urlObj.hostname.replace('www.', '');
                    this.src = `https://www.google.com/s2/favicons?domain=${dominio}&sz=128`;
                } catch (e) {
                    this.src = 'apps/app-default.png';
                }
            } else {
                this.src = 'apps/app-default.png';
            }
        };
        
        nuevoAcceso.appendChild(img);
        accesoWrapper.appendChild(nuevoAcceso);
        
        // Solo en accesses.html, agregar botÃ³n de eliminar
        const currentPage = window.location.pathname.split('/').pop() || window.location.href.split('/').pop();
        if (currentPage === 'accesses.html' || currentPage.includes('accesses')) {
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-eliminar-acceso';
            btnEliminar.innerHTML = 'Ã—';
            btnEliminar.title = 'Eliminar acceso';
            btnEliminar.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: rgba(145, 0, 2, 0.8);
                color: #fff;
                border: 2px solid #fff;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 20;
                padding: 0;
                line-height: 1;
            `;
            btnEliminar.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `eliminar-acceso.html?id=${acceso.id}&nombre=${encodeURIComponent(acceso.nombre)}`;
            };
            accesoWrapper.appendChild(btnEliminar);
        }
        
        if (botonAgregar) {
            container.insertBefore(accesoWrapper, botonAgregar);
        } else {
            container.appendChild(accesoWrapper);
        }
    });
}

// ============================================
// SOS ALERTA
// ============================================
function confirmarAlerta() {
    // Guardar la alerta en localStorage
    const alerta = {
        fecha: new Date().toISOString(),
        tipo: 'SOS',
        estado: 'enviada'
    };
    
    // Obtener alertas existentes
    let alertas = JSON.parse(localStorage.getItem('alertasSOS') || '[]');
    alertas.push(alerta);
    localStorage.setItem('alertasSOS', JSON.stringify(alertas));
    
    // Mostrar mensaje de confirmaciÃ³n y redirigir
    alert('Alerta SOS enviada exitosamente a su cuidador');
    window.location.href = 'security.html';
}

function cancelarAlerta() {
    // Volver a la pÃ¡gina de seguridad
    window.location.href = 'security.html';
}

// ============================================
// SUCCESS SAVE
// ============================================
function initSuccessSave() {
    // Obtener la pÃ¡gina de retorno desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const returnPage = urlParams.get('return') || 'calibration.html';
    
    // Agregar botÃ³n para aceptar manualmente
    const successContainer = document.querySelector('.success-container');
    if (successContainer) {
        const botonAceptar = document.createElement('a');
        botonAceptar.href = returnPage;
        botonAceptar.className = 'action-button';
        botonAceptar.textContent = 'Aceptar';
        botonAceptar.style.marginTop = '20px';
        successContainer.appendChild(botonAceptar);
    }
}

// ============================================
// GUIDE - NAVEGACIÃ“N DE IMÃGENES
// ============================================
function initGuide() {
    const guideImage = document.getElementById('guide-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (!guideImage || !prevBtn || !nextBtn) return;
    
    // Por ahora, cambiar a imagen vacÃ­a cuando se presionan las flechas
    prevBtn.addEventListener('click', function() {
        guideImage.src = '';
        guideImage.alt = 'Imagen vacÃ­a';
    });
    
    nextBtn.addEventListener('click', function() {
        guideImage.src = '';
        guideImage.alt = 'Imagen vacÃ­a';
    });
}

// ============================================
// SECURITY - OPCIONES DE SEGURIDAD
// ============================================
function openSecurityOption(option) {
    switch(option) {
        case 'contacts':
            window.location.href = 'contacts-list.html';
            break;
        case 'emergency':
            window.location.href = 'emergency-calls.html';
            break;
        case 'sos':
            window.location.href = 'sos-alerta.html';
            break;
    }
}

// ============================================
// REPORT - REPORTAR PROBLEMA
// ============================================
function initReport() {
    const btnEnviar = document.getElementById('enviar-reporte');
    if (!btnEnviar) return;
    
    btnEnviar.addEventListener('click', function() {
        // Verificar si hay algÃºn checkbox marcado
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const otrosInput = document.getElementById('otros-texto');
        let hasSelection = false;

        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                hasSelection = true;
            }
        });

        // Verificar si el campo "otros" tiene texto
        if (otrosInput && otrosInput.value.trim() !== '') {
            hasSelection = true;
        }

        // Si hay alguna selecciÃ³n o texto, redirigir a la pantalla de Ã©xito
        if (hasSelection) {
            window.location.href = 'report-success.html';
        } else {
            alert('Por favor, selecciona al menos una opciÃ³n o describe el problema.');
        }
    });
}

// ============================================
// ELIMINAR ACCESO
// ============================================
function initEliminarAcceso() {
    // Obtener el ID del acceso a eliminar desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const accesoId = urlParams.get('id');
    const nombreAcceso = urlParams.get('nombre') || 'este acceso';

    // Mostrar el nombre del acceso en la pregunta
    const questionElement = document.getElementById('eliminar-question');
    if (questionElement && nombreAcceso) {
        questionElement.textContent = `Â¿Deseas eliminar ${nombreAcceso}?`;
    }

    // Hacer las funciones globales para que los onclick funcionen
    window.confirmarEliminacion = function() {
        if (!accesoId) {
            alert('Error: No se pudo identificar el acceso a eliminar');
            window.location.href = 'accesses.html';
            return;
        }

        // Obtener accesos del localStorage
        let accesos = JSON.parse(localStorage.getItem('accesosDirectos') || '[]');
        
        // Filtrar el acceso a eliminar
        accesos = accesos.filter(acceso => acceso.id != accesoId);
        
        // Guardar los accesos actualizados
        localStorage.setItem('accesosDirectos', JSON.stringify(accesos));
        
        // Redirigir a accesses.html
        window.location.href = 'accesses.html';
    };
    
    window.cancelarEliminacion = function() {
        // Volver a la pÃ¡gina de accesos
        window.location.href = 'accesses.html';
    };
}

// ============================================
// CALIBRATION - MOSTRAR ÃšLTIMA CALIBRACIÃ“N
// ============================================
function initCalibration() {
    // FunciÃ³n para formatear la fecha de manera legible
    function formatearFechaCalibracion(fechaISO) {
        const ahora = new Date();
        const fechaCalibracion = new Date(fechaISO);
        const diferencia = ahora - fechaCalibracion;
        
        // Calcular diferencia en dÃ­as
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor(diferencia / (1000 * 60 * 60));
        const minutos = Math.floor(diferencia / (1000 * 60));
        
        // Si es hoy
        if (dias === 0) {
            if (horas === 0) {
                if (minutos < 1) {
                    return 'Hace unos momentos';
                }
                return `Hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
            }
            return `Hoy a las ${fechaCalibracion.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
        }
        
        // Si fue ayer
        if (dias === 1) {
            return `Ayer a las ${fechaCalibracion.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
        }
        
        // Si fue hace menos de una semana
        if (dias < 7) {
            return `Hace ${dias} ${dias === 1 ? 'dÃ­a' : 'dÃ­as'}`;
        }
        
        // Si fue hace mÃ¡s de una semana, mostrar fecha completa
        return fechaCalibracion.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // Cargar y mostrar la Ãºltima calibraciÃ³n
    const ultimaCalibracionInput = document.getElementById('ultima-calibracion');
    if (!ultimaCalibracionInput) return;
    
    const fechaGuardada = localStorage.getItem('ultimaCalibracion');
    
    if (fechaGuardada) {
        const fechaFormateada = formatearFechaCalibracion(fechaGuardada);
        ultimaCalibracionInput.value = fechaFormateada;
    } else {
        ultimaCalibracionInput.value = 'Nunca';
    }
}

// Sistema de traducciones
const translations = {
    es: {
        // Configuraciones
        'Configuraciones': 'Configuraciones',
        'Vincular con cuidador': 'Vincular con cuidador',
        'Conectividad con dispositivos, etc.': 'Conectividad con dispositivos, etc.',
        'Accesibilidad': 'Accesibilidad',
        'Cambiar botones, colores, brillo, etc. Opciones para mejorar la interacciÃ³n visual y tÃ¡ctil.': 'Cambiar botones, colores, brillo, etc. Opciones para mejorar la interacciÃ³n visual y tÃ¡ctil.',
        'Historial': 'Historial',
        'Historial de consumo, cuentas, etc. Registro de uso y gestiÃ³n de datos.': 'Historial de consumo, cuentas, etc. Registro de uso y gestiÃ³n de datos.',
        'Vincular con cuentas': 'Vincular con cuentas',
        'Conecta tus servicios externos': 'Conecta tus servicios externos',
        'Seguridad': 'Seguridad',
        'Mantente seguro y protegido. Herramientas de emergencia y protecciÃ³n.': 'Mantente seguro y protegido. Herramientas de emergencia y protecciÃ³n.',
        // Accesibilidad
        'Idiomas': 'Idiomas',
        'Selecciona tu idioma': 'Selecciona tu idioma',
        'Ayudas Visuales': 'Ayudas Visuales',
        'Contraste, brillo, etc.': 'Contraste, brillo, etc.',
        'TamaÃ±o de Elementos': 'TamaÃ±o de Elementos',
        'Modifica el tamaÃ±o de los elementos': 'Modifica el tamaÃ±o de los elementos',
        'Notificaciones y Alertas': 'Notificaciones y Alertas',
        'Cambia las notificaciones y alertas': 'Cambia las notificaciones y alertas',
        'Sonido': 'Sonido',
        'Ajusta el volumen': 'Ajusta el volumen',
        // Otros
        'Guardar cambios': 'Guardar cambios',
        'Cancelar cambio': 'Cancelar cambio',
        'Guardado satisfactoriamente': 'Guardado satisfactoriamente',
        'Volver': 'Volver'
    },
    en: {
        // Configuraciones
        'Configuraciones': 'Settings',
        'Vincular con cuidador': 'Link with caregiver',
        'Conectividad con dispositivos, etc.': 'Connectivity with devices, etc.',
        'Accesibilidad': 'Accessibility',
        'Cambiar botones, colores, brillo, etc. Opciones para mejorar la interacciÃ³n visual y tÃ¡ctil.': 'Change buttons, colors, brightness, etc. Options to improve visual and tactile interaction.',
        'Historial': 'History',
        'Historial de consumo, cuentas, etc. Registro de uso y gestiÃ³n de datos.': 'Consumption history, accounts, etc. Usage log and data management.',
        'Vincular con cuentas': 'Link accounts',
        'Conecta tus servicios externos': 'Connect your external services',
        'Seguridad': 'Security',
        'Mantente seguro y protegido. Herramientas de emergencia y protecciÃ³n.': 'Stay safe and protected. Emergency and protection tools.',
        // Accesibilidad
        'Idiomas': 'Languages',
        'Selecciona tu idioma': 'Select your language',
        'Ayudas Visuales': 'Visual Aids',
        'Contraste, brillo, etc.': 'Contrast, brightness, etc.',
        'TamaÃ±o de Elementos': 'Element Size',
        'Modifica el tamaÃ±o de los elementos': 'Modify the size of elements',
        'Notificaciones y Alertas': 'Notifications and Alerts',
        'Cambia las notificaciones y alertas': 'Change notifications and alerts',
        'Sonido': 'Sound',
        'Ajusta el volumen': 'Adjust volume',
        // Otros
        'Guardar cambios': 'Save changes',
        'Cancelar cambio': 'Cancel change',
        'Guardado satisfactoriamente': 'Successfully saved',
        'Volver': 'Back'
    }
};

function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'es';
}

function translatePage() {
    const lang = getCurrentLanguage();
    if (lang === 'es') return; // Si es espaÃ±ol, no hacer nada
    
    const texts = translations[lang];
    if (!texts) return;
    
    // Traducir todos los elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (texts[key]) {
            element.textContent = texts[key];
        }
    });
    
    // Traducir placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (texts[key]) {
            element.placeholder = texts[key];
        }
    });
}

// Ejecutar traducciÃ³n cuando se carga la pÃ¡gina
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', translatePage);
} else {
    translatePage();
}

