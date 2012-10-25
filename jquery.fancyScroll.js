/*
 * FancyScroll - jQuery Plugin
 *
 *
 * Copyright (c) 2012 B+G & Partners - http://bgcom.ch/ | created by Kevin Wenger - wenger.kev(at)gmail(dot)com
 * Dual licensed under the MIT and GPL licenses.
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * @author Kevin Wenger
 * @version 1.1 (2012-10-25)
 * Requires 
 *   JQuery 1.7.1 - http://jquery.com/
 *   ScrollTo 1.4.3.1 - http://flesler.blogspot.ch/2007/10/jqueryscrollto.html
 */
(function($){
	$.fancyScroll = function (element, options){
		context = this;
		context.options = {};
		context.percents = new Array();
		context.blocks = [];
		context.oldScrollTop = 0;

		element.data('fancyScroll', this);

		this.init = function(element, options) {         
			this.options = $.extend(true, $.fancyScroll.defaultOptions, options);
			context.oldScrollTop = $(window).scrollTop();
			
			$.each(element.find(context.options.elemActivate + ' a'), function(index, item){
		    context.blocks.push([$($(item).attr('href')), $(item)]);
		  });
				
			if(this.options.spy.active){
				spyScroll(this, element);
			}
			if(this.options.scroll.active)
				smoothScroll(this, element);
			 
		};

        this.init(element, options);
	};
	
	$.fn.fancyScroll = function(options) {                   
		return this.each(function() {
			(new $.fancyScroll($(this), options));              
		});        
	};
	
	// Activate spy to scroll
	function spyScroll(context, element){
		$(window).scroll(function (e) {
				if ($(window).scrollTop() != context.oldScrollTop){
					context.percents = new Array();
					topWindow = $(window).scrollTop() + 60 ; 
					pageHeight = $(document).height(); 
					windowHeight = $(window).height(); 
					footerWindow = topWindow + windowHeight;
					
					$.each(context.blocks, function(index, block){
						percentBlock = 0;
						topBlock = block[0].offset().top;
						heightBlock = block[0].height();
						footerBlock = topBlock + heightBlock;
						
						if(topWindow <= topBlock && footerWindow >= topBlock && footerWindow <= footerBlock){
							inside = footerWindow - topBlock;
							percentBlock = (inside / heightBlock ) * 100;
						}
						else if(footerWindow >= footerBlock && topWindow >= topBlock && topWindow <= footerBlock){
							outside = topWindow - topBlock;
							inside = heightBlock - outside;
							percentBlock = (inside / heightBlock ) * 100 ;
						}
						else if(topWindow >= topBlock && topWindow <= footerBlock && footerWindow >= topBlock &&  footerWindow <= footerBlock ){
							inside = windowHeight;
							percentBlock = (inside / heightBlock ) * 100 ;
						}
						else if(topWindow <= topBlock && footerWindow >= footerBlock){
							percentBlock = 100;
						}
						
						context.percents.push([block[1], percentBlock]);								
					});
					
					activate(context, element);
					
					if(context.options.debug)
						debugMode(context);			
				} 
		});
	};
	
	// Show dialog
	function smoothScroll(context, element){
		$(element).on('click', element.find(context.options.elemActivate + ' a'), function(e){
			var event = e;
			event.preventDefault();
			
			if(context.options.scroll.active)
				$(window).unbind("scroll");
									
			$(document).scrollTo('#' + e.target.href.split('#')[1], context.options.scroll.duration, {axis: context.options.scroll.axis, offset: context.options.scroll.offset, onAfter: function() {          
							context.oldScrollTop = $(window).scrollTop();

						if(context.options.scroll.active)
							spyScroll(context, element);
							
							var target = event.srcElement || event.target;
							element.find(context.options.elemActivate).removeClass(context.options.activeClass);
							addActiveClass($(target).parents(context.options.elemActivate), context);
							
							if(typeof context.options.scroll.afterSmoothClick == 'function') {
								context.options.scroll.afterSmoothClick(target.href.split('#')[1]);
							} else alert('bad callback afterSmoothClick');
					}
      });			

			return false;	
		});

	};
	
	// activate in menu
	function activate(context, element){
	  element.find(context.options.elemActivate).removeClass(context.options.activeClass);
		maxPercent = 0;
		selector = '';
		if($(window).scrollTop() == 0)
			selector = context.percents[0][0];
		else if($(window).scrollTop() + $(window).height() == $(document).height())
			selector = context.percents[context.percents.length - 1][0];
		else{
			$.each(context.percents, function(index, percent){
			    if(percent[1] > maxPercent){
			    	maxPercent = percent[1];
			    	selector = percent[0];
			    }
			});
		}
		addActiveClass(selector.parents(context.options.elemActivate), context);
	};
	
	function addActiveClass(element, context){
		element.addClass(context.options.activeClass);
	}
	
	function debugMode(context){
		$.each(context.percents, function(index, percent){
		    console.log(percent[0].selector + ' : ' + percent[1])
		}); 
	};
	
	//set default options
	$.fancyScroll.defaultOptions = {
		activeClass: "active",
		elemActivate: "li",
		debug: false,
		scroll: {
			active: true,
			offset: 0,
			axis: 'y',
			duration: 1000,
			afterSmoothClick: function(){},  //Callback: function(link's href) - Fires after the smooth scroll is finish
		},
		spy:{
			active: true
		}
  }
	
})(jQuery);
