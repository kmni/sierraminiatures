
var hju	= {
	mobileNavi:	function(){
		if ($('.mobile_navi').length)
		{
			$('.mobile_navi').on('change', function(){
				var select		= $(this),
					value		= (select.val() && select.val() != 0) ? select.val() : false;
					
				if (value)
				{
					console.log(value);
					window.location.href	= value;
				}
			});
		}
	},
	accordion:	function(){
		if ($('.nav-list li.has_children').length)
		{
			$('.nav-list li.has_children > a').on('click', function(){
				var a	= $(this),
					li	= a.parents('.has_children');
				if (li.hasClass('expanded'))
					li.removeClass('expanded');
				else
					li.addClass('expanded');

				return false;
			});
		}
	},
	masonry:	function(){
		if ($('.horses_list .list').length > 0)
		{
			$horses_list	= $('.horses_list .list');
			// once loaded
	        $horses_list.imagesLoaded(function(){
	        	if ($('.slideshow').length > 0)
				{
					// initialize Masonry
		        	$horses_list.masonry({
			            itemSelector: 	'div',
			            'gutter':     	0,
			            isFitWidth:   	false,
			            singleMode:   	false,
			            isAnimated:   	false
		        	});
					$slideshow	= $('.slideshow');
					$slideshow.cycle({timeout: 3000, pauseOnHover: true, log: false});
					setTimeout(function(){
						$horses_list.masonry('layout');
					}, 200);
				}
				else
				{
					// initialize Masonry
		        	$horses_list.masonry({
			            itemSelector: 	'div',
			            'gutter':     	0,
			            isFitWidth:   	false,
			            singleMode:   	false,
			            isAnimated:   	false
		        	});
				}
	        });
		}
	},
	cycleSlideshow:	function(){
		if ($('.cycle-slideshow').length > 0)
		{
			$cycleSlideshow	= $('.cycle-slideshow');
			$slideshow		= $('.slideshow');
			$cycleSlideshow.imagesLoaded(function(){
	        	$slideshow.cycle({fx: 'fadeout', timeout: 1000, log: false}).cycle('pause').hover(function(){$(this).cycle('resume');}, function(){$(this).cycle('pause');});
	        });
	    }
	},
	lightbox: function(){
	    $('.colorbox').colorbox({rel:'colorbox', current: '{current} of {total}'});
    },
    galleryPagination:	function(parent, item_selector){
    	var itemsCount		= $(parent + ' ' + item_selector).size();
		var itemsPerPage	= $(parent).attr('data-items-per-page') ? $(parent).attr('data-items-per-page') : 6;
		var itemsPassed		= 0;
		$(parent + ' ' + item_selector).each(function(){
			if (++itemsPassed > itemsPerPage)
			{
				$(this).addClass('hidden');
			}
		});

		if (itemsCount > itemsPerPage)
			hju.createPagination({parent: '.gallery_pagination', class: 'more_reviews', total: itemsCount, limit: itemsPerPage, title: 'Show more'});

		$('a.more_reviews').on('click', function(){
			itemsPassed		= 0;
			var page		= parseInt($(this).attr('href').replace('#', '')),
				pages		= Math.round(itemsCount/itemsPerPage);
			if (page > 0)
			{
				$('a.more_reviews').removeClass('active');
				console.log($('a[href="#'+page+'"]'));
				$('a[href="#'+page+'"]').addClass('active');
				// prev link
				if (page > 1)
				{
					$('a.prev').removeClass('disabled').attr('href', '#'+(page-1));
				}
				else
					$('a.prev').addClass('disabled').attr('href', '#1');
				// next link
				if (page < pages)
				{
					$('a.next').removeClass('disabled').attr('href', '#'+(page+1));
				}
				else
					$('a.next').addClass('disabled').attr('href', '#'+pages);

				$(parent + ' ' + item_selector).addClass('hidden');
				$(parent + ' ' + item_selector).each(function(){
					++itemsPassed;
					if (itemsPassed > ((page-1)*itemsPerPage) && itemsPassed <= page*itemsPerPage)
					{
						$(this).removeClass('hidden');
					}
				});
			}
			else
				console.log('Invalid page number: '+page);
			return false;
		});
    },
    createPagination:	function(config){
		config.id		= config.id || false;
		config.parent	= config.parent || false;
		config.total	= config.total || 0;
		config.limit	= config.limit || 10;
		config.limit	= Math.max(1, config.limit);
		config.title	= config.title || '';
		config.class	= config.class || '';

		if (!config.parent || !$(config.parent).length)
			console.log('Parental container not found for pagination!');
		else if (config.total <= 0)
			console.log('Total records is lower than or equal zero!');
		else
		{
			var parent	= $(config.parent);
			var pages	= Math.round(config.total/config.limit);
			parent.append('<a class="'+config.class+' prev disabled" href="#1" title="Previous page"><img src="img/s.gif"></a>');
			for (var i=1; i <= pages; i++)
			{
				parent.append('<a class="'+config.class+''+(i == 1 ? ' active' : '')+'" href="#'+i+'" title="'+config.title+'">'+i+'</a>');
			}
			parent.append('<a class="'+config.class+' next" href="#2" title="Next page"><img src="img/s.gif"></a>');
		}
	},
	synchronizeColumnsHeight:	function(){
		$(document).imagesLoaded(function(){
			if ($('body').data('synchronize-columns') == true)
			{
				var	leftcol				= $('.leftcol'),
					contentcol			= $('.contentcol'),
					leftcol_height		= leftcol.height(),
					contentcol_height	= contentcol.height(),			
					diff_height			= leftcol_height - contentcol_height;
				// console.log('leftcol height: '+leftcol_height);
				// console.log('contentcol height: '+contentcol);
				// console.log('height diff leftcol-contencol: '+diff_height);
				if (diff_height < 0)
				{
					leftcol.css({'height': (leftcol_height+Math.abs(diff_height))+'px'});
				}
			}
		});
	},
	
	init:	function(){
		hju.mobileNavi();
		hju.accordion();
		hju.masonry();
		hju.lightbox();
		hju.cycleSlideshow();
		setTimeout(hju.synchronizeColumnsHeight, 200);
		// hju.galleryPagination('.gallery_list', 'a.colorbox');
	}
};
$(document).ready(function(){
	hju.init();
});