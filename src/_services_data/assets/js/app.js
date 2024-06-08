//TODO: this is redundant. its used directly in the sidebar comp. although it needs to be refractored to not be jquery and the junk functions removed

import $ from 'jquery';

$(document).ready(function () {

	// Variables declarations

	var $wrapper = $('.main-wrapper');
	var $pageWrapper = $('.page-wrapper');
	var $slimScrolls = $('.slimscroll');

	// Sidebar

	var Sidemenu = function () {
		this.$menuItem = $('#sidebar-menu a');
	};

	function init() {
		var $this = Sidemenu;
		$('#sidebar-menu a').on('click', function (e) {
			console.log("----------------------------------")
			if ($(this).parent().hasClass('submenu')) {

				e.preventDefault();
			}
			if (!$(this).hasClass('subdrop')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('a', $(this).parents('ul:first')).removeClass('subdrop');
				$(this).next('ul').slideDown(350);
				$(this).addClass('subdrop');
			} else if ($(this).hasClass('subdrop')) {

				$(this).removeClass('subdrop');
				$(this).next('ul').slideUp(350);
			}
		});
		$('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
	}

	// Sidebar Initiate
	init();

	// Mobile menu sidebar overlay

	$('body').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function () {
		$wrapper.toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		$('#task_window').removeClass('opened');
		return false;
	});

	$(".sidebar-overlay").on("click", function () {
		$('html').removeClass('menu-opened');
		$(this).removeClass('opened');
		$wrapper.removeClass('slide-nav');
		$('.sidebar-overlay').removeClass('opened');
		$('#task_window').removeClass('opened');
	});

	// Chat sidebar overlay

	$(document).on('click', '#task_chat', function () {
		$('.sidebar-overlay').toggleClass('opened');
		$('#task_window').addClass('opened');
		return false;
	});

	// Select 2

	if ($('.select').length > 0) {
		$('.select').select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
	}

	// Modal Popup hide show

	if ($('.modal').length > 0) {
		var modalUniqueClass = ".modal";
		$('.modal').on('show.bs.modal', function (e) {
			var $element = $(this);
			var $uniques = $(modalUniqueClass + ':visible').not($(this));
			if ($uniques.length) {
				$uniques.modal('hide');
				$uniques.one('hidden.bs.modal', function (e) {
					$element.modal('show');
				});
				return false;
			}
		});
	}

	// Floating Label

	if ($('.floating').length > 0) {
		$('.floating').on('focus blur', function (e) {
			$(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
		}).trigger('blur');
	}

	// Sidebar Slimscroll

	if ($slimScrolls.length > 0) {
		$slimScrolls.slimScroll({
			height: 'auto',
			width: '100%',
			position: 'right',
			size: '7px',
			color: '#ccc',
			wheelStep: 10,
			touchScrollStep: 100
		});
		var wHeight = $(window).height() - 60;
		$slimScrolls.height(wHeight);
		$('.sidebar .slimScrollDiv').height(wHeight);
		$(window).resize(function () {
			var rHeight = $(window).height() - 60;
			$slimScrolls.height(rHeight);
			$('.sidebar .slimScrollDiv').height(rHeight);
		});
	}

	// Page Content Height

	var pHeight = $(window).height();
	$pageWrapper.css('min-height', pHeight);
	$(window).resize(function () {
		var prHeight = $(window).height();
		$pageWrapper.css('min-height', prHeight);
	});

	// Date Time Picker

	if ($('.datetimepicker').length > 0) {
		$('.datetimepicker').datetimepicker({
			format: 'DD/MM/YYYY',
			icons: {
				up: "fa fa-angle-up",
				down: "fa fa-angle-down",
				next: 'fa fa-angle-right',
				previous: 'fa fa-angle-left'
			}
		});
	}

	// Datatable

	if ($('.datatable').length > 0) {
		$('.datatable').DataTable({
			"bFilter": false,
		});
	}

	// Tooltip

	if ($('[data-toggle="tooltip"]').length > 0) {
		$('[data-toggle="tooltip"]').tooltip();
	}

	// Email Inbox

	if ($('.clickable-row').length > 0) {
		$(".clickable-row").click(function () {
			window.location = $(this).data("href");
		});
	}

	// Check all email

	$(document).on('click', '#check_all', function () {
		$('.checkmail').click();
		return false;
	});
	if ($('.checkmail').length > 0) {
		$('.checkmail').each(function () {
			$(this).on('click', function () {
				if ($(this).closest('tr').hasClass('checked')) {
					$(this).closest('tr').removeClass('checked');
				} else {
					$(this).closest('tr').addClass('checked');
				}
			});
		});
	}

	// Mail important

	$(document).on('click', '.mail-important', function () {
		$(this).find('i.fa').toggleClass('fa-star').toggleClass('fa-star-o');
	});

	// Summernote

	// if($('.summernote').length > 0) {
	// 	$('.summernote').summernote({
	// 		height: 200,                 // set editor height
	// 		minHeight: null,             // set minimum height of editor
	// 		maxHeight: null,             // set maximum height of editor
	// 		focus: false                 // set focus to editable area after initializing summernote
	// 	});
	// }

	// Task Complete

	$(document).on('click', '#task_complete', function () {
		$(this).toggleClass('task-completed');
		return false;
	});

	// Multiselect

	if ($('#customleave_select').length > 0) {
		$('#customleave_select').multiselect();
	}
	if ($('#edit_customleave_select').length > 0) {
		$('#edit_customleave_select').multiselect();
	}

	// Leave Settings button show

	$(document).on('click', '.leave-edit-btn', function () {
		$(this).removeClass('leave-edit-btn').addClass('btn btn-white leave-cancel-btn').text('Cancel');
		$(this).closest("div.leave-right").append('<button class="btn btn-primary leave-save-btn" type="submit">Save</button>');
		$(this).parent().parent().find("input").prop('disabled', false);
		return false;
	});
	$(document).on('click', '.leave-cancel-btn', function () {
		$(this).removeClass('btn btn-white leave-cancel-btn').addClass('leave-edit-btn').text('Edit');
		$(this).closest("div.leave-right").find(".leave-save-btn").remove();
		$(this).parent().parent().find("input").prop('disabled', true);
		return false;
	});

	$(document).on('change', '.leave-box .onoffswitch-checkbox', function () {
		var id = $(this).attr('id').split('_')[1];
		if ($(this).prop("checked") == true) {
			$("#leave_" + id + " .leave-edit-btn").prop('disabled', false);
			$("#leave_" + id + " .leave-action .btn").prop('disabled', false);
		}
		else {
			$("#leave_" + id + " .leave-action .btn").prop('disabled', true);
			$("#leave_" + id + " .leave-cancel-btn").parent().parent().find("input").prop('disabled', true);
			$("#leave_" + id + " .leave-cancel-btn").closest("div.leave-right").find(".leave-save-btn").remove();
			$("#leave_" + id + " .leave-cancel-btn").removeClass('btn btn-white leave-cancel-btn').addClass('leave-edit-btn').text('Edit');
			$("#leave_" + id + " .leave-edit-btn").prop('disabled', true);
		}
	});

	$('.leave-box .onoffswitch-checkbox').each(function () {
		var id = $(this).attr('id').split('_')[1];
		if ($(this).prop("checked") == true) {
			$("#leave_" + id + " .leave-edit-btn").prop('disabled', false);
			$("#leave_" + id + " .leave-action .btn").prop('disabled', false);
		}
		else {
			$("#leave_" + id + " .leave-action .btn").prop('disabled', true);
			$("#leave_" + id + " .leave-cancel-btn").parent().parent().find("input").prop('disabled', true);
			$("#leave_" + id + " .leave-cancel-btn").closest("div.leave-right").find(".leave-save-btn").remove();
			$("#leave_" + id + " .leave-cancel-btn").removeClass('btn btn-white leave-cancel-btn').addClass('leave-edit-btn').text('Edit');
			$("#leave_" + id + " .leave-edit-btn").prop('disabled', true);
		}
	});

	// Placeholder Hide

	if ($('.otp-input, .zipcode-input input, .noborder-input input').length > 0) {
		$('.otp-input, .zipcode-input input, .noborder-input input').focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'))
				.attr('placeholder', '');
		}).blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	}

	// OTP Input

	if ($('.otp-input').length > 0) {
		$(".otp-input").keyup(function (e) {
			if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
				$(e.target).next('.otp-input').focus();
			} else if (e.which == 8) {
				$(e.target).prev('.otp-input').focus();
			}
		});
	}

	// Small Sidebar

	$(document).on('click', '#toggle_btn', function () {
		if ($('body').hasClass('mini-sidebar')) {
			$('body').removeClass('mini-sidebar');
			$('.subdrop + ul').slideDown();
		} else {
			$('body').addClass('mini-sidebar');
			$('.subdrop + ul').slideUp();
		}
		return false;
	});
	$(document).on('mouseover', function (e) {
		e.stopPropagation();
		if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
			var targ = $(e.target).closest('.sidebar').length;
			if (targ) {
				$('body').addClass('expand-menu');
				$('.subdrop + ul').slideDown();
			} else {
				$('body').removeClass('expand-menu');
				$('.subdrop + ul').slideUp();
			}
			return false;
		}
	});

	$(document).on('click', '.top-nav-search .responsive-search', function () {
		$('.top-nav-search').toggleClass('active');
	});

	$(document).on('click', '#file_sidebar_toggle', function () {
		$('.file-wrap').toggleClass('file-sidebar-toggle');
	});

	$(document).on('click', '.file-side-close', function () {
		$('.file-wrap').removeClass('file-sidebar-toggle');
	});

	if ($('.kanban-wrap').length > 0) {
		$(".kanban-wrap").sortable({
			connectWith: ".kanban-wrap",
			handle: ".kanban-box",
			placeholder: "drag-placeholder"
		});
	}

});

// Loader

$(window).on('load', function () {
	$('#loader').delay(100).fadeOut('slow');
	$('#loader-wrapper').delay(500).fadeOut('slow');
});



/*


document.addEventListener('DOMContentLoaded', function () {
	console.log("tetstsssssssssssssssssss")
	// Variables declarations
	var wrapper = document.querySelector('.main-wrapper');
	var pageWrapper = document.querySelector('.page-wrapper');
	var slimScrolls = document.querySelectorAll('.slimscroll');

	// Sidebar
	function Sidemenu() {
		this.menuItem = document.querySelectorAll('#sidebar-menu a');
	}

	function init() {
		var menuItem = document.querySelectorAll('#sidebar-menu a');
		for (var i = 0; i < menuItem.length; i++) {
			menuItem[i].addEventListener('click', function (e) {
				console.log("----------------------------------")
				if (this.parentElement.classList.contains('submenu')) {
					e.preventDefault();
				}
				if (!this.classList.contains('subdrop')) {
					var parentUl = this.closest('ul');
					var siblingUls = parentUl.querySelectorAll('ul');
					var siblingAs = parentUl.querySelectorAll('a');
					for (var j = 0; j < siblingUls.length; j++) {
						siblingUls[j].style.display = 'none';
					}
					for (var k = 0; k < siblingAs.length; k++) {
						siblingAs[k].classList.remove('subdrop');
					}
					this.nextElementSibling.style.display = 'block';
					this.classList.add('subdrop');
				} else if (this.classList.contains('subdrop')) {
					this.classList.remove('subdrop');
					this.nextElementSibling.style.display = 'none';
				}
			});
		}
		var activeSubmenu = document.querySelector('#sidebar-menu ul li.submenu a.active');
		if (activeSubmenu) {
			activeSubmenu.closest('li:last-child').querySelector('a:first-child').classList.add('active');
			activeSubmenu.closest('li:last-child').querySelector('a:first-child').click();
		}
	}

	// Sidebar Initiate
	init();

	// Mobile menu sidebar overlay
	document.body.insertAdjacentHTML('beforeend', '<div class="sidebar-overlay"></div>');
	var mobileBtn = document.querySelector('#mobile_btn');
	mobileBtn.addEventListener('click', function () {
		wrapper.classList.toggle('slide-nav');
		document.querySelector('.sidebar-overlay').classList.toggle('opened');
		document.documentElement.classList.add('menu-opened');
		document.querySelector('#task_window').classList.remove('opened');
		return false;
	});

	var sidebarOverlay = document.querySelector(".sidebar-overlay");
	sidebarOverlay.addEventListener("click", function () {
		document.documentElement.classList.remove('menu-opened');
		this.classList.remove('opened');
		wrapper.classList.remove('slide-nav');
		document.querySelector('.sidebar-overlay').classList.remove('opened');
		document.querySelector('#task_window').classList.remove('opened');
	});

	// Chat sidebar overlay
	var taskChat = document.querySelector('#task_chat');
	taskChat.addEventListener('click', function () {
		document.querySelector('.sidebar-overlay').classList.toggle('opened');
		document.querySelector('#task_window').classList.add('opened');
		return false;
	});

	// Select 2
	var selectElements = document.querySelectorAll('.select');
	if (selectElements.length > 0) {
		for (var i = 0; i < selectElements.length; i++) {
			new Select2(selectElements[i], {
				minimumResultsForSearch: -1,
				width: '100%'
			});
		}
	}

	// Modal Popup hide show
	var modalElements = document.querySelectorAll('.modal');
	if (modalElements.length > 0) {
		var modalUniqueClass = ".modal";
		for (var i = 0; i < modalElements.length; i++) {
			modalElements[i].addEventListener('show.bs.modal', function (e) {
				var element = e.target;
				var uniques = document.querySelectorAll(modalUniqueClass + ':visible:not(' + element + ')');
				if (uniques.length) {
					for (var j = 0; j < uniques.length; j++) {
						uniques[j].modal('hide');
						uniques[j].addEventListener('hidden.bs.modal', function (e) {
							element.modal('show');
						});
						return false;
					}
				}
			});
		}
	}

	// Floating Label
	var floatingInputs = document.querySelectorAll('.floating input');
	if (floatingInputs.length > 0) {
		for (var i = 0; i < floatingInputs.length; i++) {
			floatingInputs[i].addEventListener('focus', function (e) {
				this.closest('.form-focus').classList.add('focused');
			});
			floatingInputs[i].addEventListener('blur', function (e) {
				if (e.type === 'focus' || this.value.length > 0) {
					this.closest('.form-focus').classList.add('focused');
				} else {
					this.closest('.form-focus').classList.remove('focused');
				}
			});
		}
	}

	// Sidebar Slimscroll
	if (slimScrolls.length > 0) {
		for (var i = 0; i < slimScrolls.length; i++) {
			new SlimScroll(slimScrolls[i], {
				height: 'auto',
				width: '100%',
				position: 'right',
				size: '7px',
				color: '#ccc',
				wheelStep: 10,
				touchScrollStep: 100
			});
			var wHeight = window.innerHeight - 60;
			slimScrolls[i].style.height = wHeight + 'px';
			slimScrolls[i].querySelector('.sidebar .slimScrollDiv').style.height = wHeight + 'px';
			window.addEventListener('resize', function () {
				var rHeight = window.innerHeight - 60;
				slimScrolls[i].style.height = rHeight + 'px';
				slimScrolls[i].querySelector('.sidebar .slimScrollDiv').style.height = rHeight + 'px';
			});
		}
	}

	// Page Content Height
	var pHeight = window.innerHeight;
	pageWrapper.style.minHeight = pHeight + 'px';
	window.addEventListener('resize', function () {
		var prHeight = window.innerHeight;
		pageWrapper.style.minHeight = prHeight + 'px';
	});

	// Date Time Picker
	var datetimepickers = document.querySelectorAll('.datetimepicker');
	if (datetimepickers.length > 0) {
		for (var i = 0; i < datetimepickers.length; i++) {
			new DateTimePicker(datetimepickers[i], {
				format: 'DD/MM/YYYY',
				icons: {
					up: "fa fa-angle-up",
					down: "fa fa-angle-down",
					next: 'fa fa-angle-right',
					previous: 'fa fa-angle-left'
				}
			});
		}
	}

	// Datatable
	var datatables = document.querySelectorAll('.datatable');
	if (datatables.length > 0) {
		for (var i = 0; i < datatables.length; i++) {
			new DataTable(datatables[i], {
				bFilter: false
			});
		}
	}

	// Tooltip
	var tooltipElements = document.querySelectorAll('[data-toggle="tooltip"]');
	if (tooltipElements.length > 0) {
		for (var i = 0; i < tooltipElements.length; i++) {
			new Tooltip(tooltipElements[i]);
		}
	}

	// Email Inbox
	var clickableRows = document.querySelectorAll('.clickable-row');
	if (clickableRows.length > 0) {
		for (var i = 0; i < clickableRows.length; i++) {
			clickableRows[i].addEventListener('click', function () {
				window.location = this.dataset.href;
			});
		}
	}

	// Check all email
	var checkAll = document.querySelector('#check_all');
	if (checkAll) {
		checkAll.addEventListener('click', function () {
			var checkmails = document.querySelectorAll('.checkmail');
			for (var i = 0; i < checkmails.length; i++) {
				checkmails[i].click();
			}
			return false;
		});
	}

	var checkmails = document.querySelectorAll('.checkmail');
	if (checkmails.length > 0) {
		for (var i = 0; i < checkmails.length; i++) {
			checkmails[i].addEventListener('click', function () {
				var closestTr = this.closest('tr');
				if (closestTr.classList.contains('checked')) {
					closestTr.classList.remove('checked');
				} else {
					closestTr.classList.add('checked');
				}
			});
		}
	}

	// Mail important
	var mailImportant = document.querySelectorAll('.mail-important');
	if (mailImportant.length > 0) {
		for (var i = 0; i < mailImportant.length; i++) {
			mailImportant[i].addEventListener('click', function () {
				var icon = this.querySelector('i.fa');
				if (icon.classList.contains('fa-star')) {
					icon.classList.remove('fa-star');
					icon.classList.add('fa-star-o');
				} else {
					icon.classList.remove('fa-star-o');
					icon.classList.add('fa-star');
				}
			});
		}
	}

	// Multiselect
	var customleaveSelect = document.querySelector('#customleave_select');
	if (customleaveSelect) {
		new Multiselect(customleaveSelect);
	}
	var editCustomleaveSelect = document.querySelector('#edit_customleave_select');
	if (editCustomleaveSelect) {
		new Multiselect(editCustomleaveSelect);
	}

	// Leave Settings button show
	var leaveEditBtns = document.querySelectorAll('.leave-edit-btn');
	if (leaveEditBtns.length > 0) {
		for (var i = 0; i < leaveEditBtns.length; i++) {
			leaveEditBtns[i].addEventListener('click', function () {
				this.classList.remove('leave-edit-btn');
				this.classList.add('btn', 'btn-white', 'leave-cancel-btn');
				this.textContent = 'Cancel';
				var leaveRightDiv = this.closest('div.leave-right');
				leaveRightDiv.insertAdjacentHTML('beforeend', '<button class="btn btn-primary leave-save-btn" type="submit">Save</button>');
				var leaveInputs = leaveRightDiv.querySelectorAll('input');
				for (var j = 0; j < leaveInputs.length; j++) {
					leaveInputs[j].disabled = false;
				}
				return false;
			});
		}
	}
	var leaveCancelBtns = document.querySelectorAll('.leave-cancel-btn');
	if (leaveCancelBtns.length > 0) {
		for (var i = 0; i < leaveCancelBtns.length; i++) {
			leaveCancelBtns[i].addEventListener('click', function () {
				this.classList.remove('btn', 'btn-white', 'leave-cancel-btn');
				this.classList.add('leave-edit-btn');
				this.textContent = 'Edit';
				var leaveRightDiv = this.closest('div.leave-right');
				var leaveSaveBtn = leaveRightDiv.querySelector('.leave-save-btn');
				leaveSaveBtn.remove();
				var leaveInputs = leaveRightDiv.querySelectorAll('input');
				for (var j = 0; j < leaveInputs.length; j++) {
					leaveInputs[j].disabled = true;
				}
				return false;
			});
		}
	}
	var leaveBoxCheckboxes = document.querySelectorAll('.leave-box .onoffswitch-checkbox');
	if (leaveBoxCheckboxes.length > 0) {
		for (var i = 0; i < leaveBoxCheckboxes.length; i++) {
			leaveBoxCheckboxes[i].addEventListener('change', function () {
				var id = this.id.split('_')[1];
				var leaveEditBtn = document.querySelector("#leave_" + id + " .leave-edit-btn");
				var leaveActionButtons = document.querySelectorAll("#leave_" + id + " .leave-action .btn");
				if (this.checked) {
					leaveEditBtn.disabled = false;
					for (var j = 0; j < leaveActionButtons.length; j++) {
						leaveActionButtons[j].disabled = false;
					}
				} else {
					for (var j = 0; j < leaveActionButtons.length; j++) {
						leaveActionButtons[j].disabled = true;
					}
					var leaveInputs = document.querySelectorAll("#leave_" + id + " input");
					for (var k = 0; k < leaveInputs.length; k++) {
						leaveInputs[k].disabled = true;
					}
					var leaveCancelBtn = document.querySelector("#leave_" + id + " .leave-cancel-btn");
					var leaveSaveBtn = document.querySelector("#leave_" + id + " .leave-save-btn");
					leaveSaveBtn.remove();
					leaveCancelBtn.classList.remove('btn', 'btn-white', 'leave-cancel-btn');
					leaveCancelBtn.classList.add('leave-edit-btn');
					leaveCancelBtn.textContent = 'Edit';
					leaveEditBtn.disabled = true;
				}
			});
		}
	}

	var smallSidebarToggle = document.querySelector('#toggle_btn');
	if (smallSidebarToggle) {
		smallSidebarToggle.addEventListener('click', function () {
			var body = document.body;
			if (body.classList.contains('mini-sidebar')) {
				body.classList.remove('mini-sidebar');
				var subdropUls = document.querySelectorAll('.subdrop + ul');
				for (var i = 0; i < subdropUls.length; i++) {
					subdropUls[i].style.display = 'block';
				}
			} else {
				body.classList.add('mini-sidebar');
				var subdropUls = document.querySelectorAll('.subdrop + ul');
				for (var i = 0; i < subdropUls.length; i++) {
					subdropUls[i].style.display = 'none';
				}
			}
			return false;
		});

		document.addEventListener('mouseover', function (e) {
			e.stopPropagation();
			var body = document.body;
			var toggleBtn = document.querySelector('#toggle_btn');
			if (body.classList.contains('mini-sidebar') && toggleBtn.offsetWidth > 0) {
				var target = e.target.closest('.sidebar');
				if (target) {
					body.classList.add('expand-menu');
					var subdropUls = document.querySelectorAll('.subdrop + ul');
					for (var i = 0; i < subdropUls.length; i++) {
						subdropUls[i].style.display = 'block';
					}
				} else {
					body.classList.remove('expand-menu');
					var subdropUls = document.querySelectorAll('.subdrop + ul');
					for (var i = 0; i < subdropUls.length; i++) {
						subdropUls[i].style.display = 'none';
					}
				}
				return false;
			}
		});

		var topNavSearch = document.querySelector('.top-nav-search .responsive-search');
		if (topNavSearch) {
			topNavSearch.addEventListener('click', function () {
				document.querySelector('.top-nav-search').classList.toggle('active');
			});
		}

		var fileSidebarToggle = document.querySelector('#file_sidebar_toggle');
		if (fileSidebarToggle) {
			fileSidebarToggle.addEventListener('click', function () {
				document.querySelector('.file-wrap').classList.toggle('file-sidebar-toggle');
			});
		}

		var fileSideClose = document.querySelector('.file-side-close');
		if (fileSideClose) {
			fileSideClose.addEventListener('click', function () {
				document.querySelector('.file-wrap').classList.remove('file-sidebar-toggle');
			});
		}

		var kanbanWrap = document.querySelector('.kanban-wrap');
		if (kanbanWrap) {
			new Sortable(kanbanWrap, {
				connectWith: '.kanban-wrap',
				handle: '.kanban-box',
				placeholder: 'drag-placeholder'
			});
		}
	}

	// Loader
	window.addEventListener('load', function () {
		var loader = document.querySelector('#loader');
		var loaderWrapper = document.querySelector('#loader-wrapper');
		setTimeout(function () {
			loader.style.display = 'none';
			loaderWrapper.style.display = 'none';
		}, 100);
	});
});



*/





/*
import $ from 'jquery';

$(document).ready(function () {

	// Variables declarations

	var $wrapper = $('.main-wrapper');
	var $pageWrapper = $('.page-wrapper');
	var $slimScrolls = $('.slimscroll');

	// Sidebar

	var Sidemenu = function () {
		this.$menuItem = $('#sidebar-menu a');
	};

	function init() {
		var $this = Sidemenu;
		$('#sidebar-menu a').on('click', function (e) {
			console.log("----------------------------------")
			if ($(this).parent().hasClass('submenu')) {

				e.preventDefault();
			}
			if (!$(this).hasClass('subdrop')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('a', $(this).parents('ul:first')).removeClass('subdrop');
				$(this).next('ul').slideDown(350);
				$(this).addClass('subdrop');
			} else if ($(this).hasClass('subdrop')) {

				$(this).removeClass('subdrop');
				$(this).next('ul').slideUp(350);
			}
		});
		$('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
	}

	// Sidebar Initiate
	init();

	// Mobile menu sidebar overlay

	$('body').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function () {
		$wrapper.toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		$('#task_window').removeClass('opened');
		return false;
	});

	$(".sidebar-overlay").on("click", function () {
		$('html').removeClass('menu-opened');
		$(this).removeClass('opened');
		$wrapper.removeClass('slide-nav');
		$('.sidebar-overlay').removeClass('opened');
		$('#task_window').removeClass('opened');
	});

	// Chat sidebar overlay

	$(document).on('click', '#task_chat', function () {
		$('.sidebar-overlay').toggleClass('opened');
		$('#task_window').addClass('opened');
		return false;
	});

	// Select 2

	if ($('.select').length > 0) {
		$('.select').select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
	}

	// Modal Popup hide show

	if ($('.modal').length > 0) {
		var modalUniqueClass = ".modal";
		$('.modal').on('show.bs.modal', function (e) {
			var $element = $(this);
			var $uniques = $(modalUniqueClass + ':visible').not($(this));
			if ($uniques.length) {
				$uniques.modal('hide');
				$uniques.one('hidden.bs.modal', function (e) {
					$element.modal('show');
				});
				return false;
			}
		});
	}

	// Floating Label

	if ($('.floating').length > 0) {
		$('.floating').on('focus blur', function (e) {
			$(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
		}).trigger('blur');
	}

	// Sidebar Slimscroll

	if ($slimScrolls.length > 0) {
		$slimScrolls.slimScroll({
			height: 'auto',
			width: '100%',
			position: 'right',
			size: '7px',
			color: '#ccc',
			wheelStep: 10,
			touchScrollStep: 100
		});
		var wHeight = $(window).height() - 60;
		$slimScrolls.height(wHeight);
		$('.sidebar .slimScrollDiv').height(wHeight);
		$(window).resize(function () {
			var rHeight = $(window).height() - 60;
			$slimScrolls.height(rHeight);
			$('.sidebar .slimScrollDiv').height(rHeight);
		});
	}

	// Page Content Height

	var pHeight = $(window).height();
	$pageWrapper.css('min-height', pHeight);
	$(window).resize(function () {
		var prHeight = $(window).height();
		$pageWrapper.css('min-height', prHeight);
	});

	// Date Time Picker

	if ($('.datetimepicker').length > 0) {
		$('.datetimepicker').datetimepicker({
			format: 'DD/MM/YYYY',
			icons: {
				up: "fa fa-angle-up",
				down: "fa fa-angle-down",
				next: 'fa fa-angle-right',
				previous: 'fa fa-angle-left'
			}
		});
	}

	// Datatable

	if ($('.datatable').length > 0) {
		$('.datatable').DataTable({
			"bFilter": false,
		});
	}

	// Tooltip

	if ($('[data-toggle="tooltip"]').length > 0) {
		$('[data-toggle="tooltip"]').tooltip();
	}

	// Email Inbox

	if ($('.clickable-row').length > 0) {
		$(".clickable-row").click(function () {
			window.location = $(this).data("href");
		});
	}

	// Check all email

	$(document).on('click', '#check_all', function () {
		$('.checkmail').click();
		return false;
	});
	if ($('.checkmail').length > 0) {
		$('.checkmail').each(function () {
			$(this).on('click', function () {
				if ($(this).closest('tr').hasClass('checked')) {
					$(this).closest('tr').removeClass('checked');
				} else {
					$(this).closest('tr').addClass('checked');
				}
			});
		});
	}

	// Mail important

	$(document).on('click', '.mail-important', function () {
		$(this).find('i.fa').toggleClass('fa-star').toggleClass('fa-star-o');
	});

	// Summernote

	// if($('.summernote').length > 0) {
	// 	$('.summernote').summernote({
	// 		height: 200,                 // set editor height
	// 		minHeight: null,             // set minimum height of editor
	// 		maxHeight: null,             // set maximum height of editor
	// 		focus: false                 // set focus to editable area after initializing summernote
	// 	});
	// }

	// Task Complete

	$(document).on('click', '#task_complete', function () {
		$(this).toggleClass('task-completed');
		return false;
	});

	// Multiselect

	if ($('#customleave_select').length > 0) {
		$('#customleave_select').multiselect();
	}
	if ($('#edit_customleave_select').length > 0) {
		$('#edit_customleave_select').multiselect();
	}

	// Leave Settings button show

	$(document).on('click', '.leave-edit-btn', function () {
		$(this).removeClass('leave-edit-btn').addClass('btn btn-white leave-cancel-btn').text('Cancel');
		$(this).closest("div.leave-right").append('<button class="btn btn-primary leave-save-btn" type="submit">Save</button>');
		$(this).parent().parent().find("input").prop('disabled', false);
		return false;
	});
	$(document).on('click', '.leave-cancel-btn', function () {
		$(this).removeClass('btn btn-white leave-cancel-btn').addClass('leave-edit-btn').text('Edit');
		$(this).closest("div.leave-right").find(".leave-save-btn").remove();
		$(this).parent().parent().find("input").prop('disabled', true);
		return false;
	});

	$(document).on('change', '.leave-box .onoffswitch-checkbox', function () {
		var id = $(this).attr('id').split('_')[1];
		if ($(this).prop("checked") == true) {
			$("#leave_" + id + " .leave-edit-btn").prop('disabled', false);
			$("#leave_" + id + " .leave-action .btn").prop('disabled', false);
		}
		else {
			$("#leave_" + id + " .leave-action .btn").prop('disabled', true);
			$("#leave_" + id + " .leave-cancel-btn").parent().parent().find("input").prop('disabled', true);
			$("#leave_" + id + " .leave-cancel-btn").closest("div.leave-right").find(".leave-save-btn").remove();
			$("#leave_" + id + " .leave-cancel-btn").removeClass('btn btn-white leave-cancel-btn').addClass('leave-edit-btn').text('Edit');
			$("#leave_" + id + " .leave-edit-btn").prop('disabled', true);
		}
	});

	$('.leave-box .onoffswitch-checkbox').each(function () {
		var id = $(this).attr('id').split('_')[1];
		if ($(this).prop("checked") == true) {
			$("#leave_" + id + " .leave-edit-btn").prop('disabled', false);
			$("#leave_" + id + " .leave-action .btn").prop('disabled', false);
		}
		else {
			$("#leave_" + id + " .leave-action .btn").prop('disabled', true);
			$("#leave_" + id + " .leave-cancel-btn").parent().parent().find("input").prop('disabled', true);
			$("#leave_" + id + " .leave-cancel-btn").closest("div.leave-right").find(".leave-save-btn").remove();
			$("#leave_" + id + " .leave-cancel-btn").removeClass('btn btn-white leave-cancel-btn').addClass('leave-edit-btn').text('Edit');
			$("#leave_" + id + " .leave-edit-btn").prop('disabled', true);
		}
	});

	// Placeholder Hide

	if ($('.otp-input, .zipcode-input input, .noborder-input input').length > 0) {
		$('.otp-input, .zipcode-input input, .noborder-input input').focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'))
				.attr('placeholder', '');
		}).blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	}

	// OTP Input

	if ($('.otp-input').length > 0) {
		$(".otp-input").keyup(function (e) {
			if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
				$(e.target).next('.otp-input').focus();
			} else if (e.which == 8) {
				$(e.target).prev('.otp-input').focus();
			}
		});
	}

	// Small Sidebar

	$(document).on('click', '#toggle_btn', function () {
		if ($('body').hasClass('mini-sidebar')) {
			$('body').removeClass('mini-sidebar');
			$('.subdrop + ul').slideDown();
		} else {
			$('body').addClass('mini-sidebar');
			$('.subdrop + ul').slideUp();
		}
		return false;
	});
	$(document).on('mouseover', function (e) {
		e.stopPropagation();
		if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
			var targ = $(e.target).closest('.sidebar').length;
			if (targ) {
				$('body').addClass('expand-menu');
				$('.subdrop + ul').slideDown();
			} else {
				$('body').removeClass('expand-menu');
				$('.subdrop + ul').slideUp();
			}
			return false;
		}
	});

	$(document).on('click', '.top-nav-search .responsive-search', function () {
		$('.top-nav-search').toggleClass('active');
	});

	$(document).on('click', '#file_sidebar_toggle', function () {
		$('.file-wrap').toggleClass('file-sidebar-toggle');
	});

	$(document).on('click', '.file-side-close', function () {
		$('.file-wrap').removeClass('file-sidebar-toggle');
	});

	if ($('.kanban-wrap').length > 0) {
		$(".kanban-wrap").sortable({
			connectWith: ".kanban-wrap",
			handle: ".kanban-box",
			placeholder: "drag-placeholder"
		});
	}

});

// Loader

$(window).on('load', function () {
	$('#loader').delay(100).fadeOut('slow');
	$('#loader-wrapper').delay(500).fadeOut('slow');
});
*/