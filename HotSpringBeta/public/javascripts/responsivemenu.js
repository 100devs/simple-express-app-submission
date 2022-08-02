/*! http://tinynav.viljamis.com v1.1 by @viljamis */
(function(a,i,g){a.fn.tinyNav=function(j){var b=a.extend({active:"selected",header:"",label:""},j);return this.each(function(){g++;var h=a(this),d="tinynav"+g,f=".l_"+d,e=a("<select/>").attr("id",d).addClass("tinynav "+d);if(h.is("ul,ol")){""!==b.header&&e.append(a("<option/>").text(b.header));var c="";h.addClass("l_"+d).find("a").each(function(){c+='<option value="'+a(this).attr("href")+'">';var b;for(b=0;b<a(this).parents("ul, ol").length-1;b++)c+="- ";c+=a(this).text()+"</option>"});e.append(c);
b.header||e.find(":eq("+a(f+" li").index(a(f+" li."+b.active))+")").attr("selected",!0);e.change(function(){i.location.href=a(this).val()});a(f).after(e);b.label&&e.before(a("<label/>").attr("for",d).addClass("tinynav_label "+d+"_label").append(b.label))}})}})(jQuery,this,0);

$(document).ready(function () {
	$("#main-menu").tinyNav({
	  active: 'selected', // String: Set the "active" class
	  header: 'MENU', // String: Specify text for "header" and show header instead of the active item
	  indent: '- ', // String: Specify text for indenting sub-items
	  label: '' // String: Sets the <label> text for the <select> (if not set, no label will be added)
	});
 });
 
// initialise plugins superfish menu
                jQuery(document).ready(function($){
                        // ****************???????????????????
                        // jQuery('ul.sf-menu').superfish();
 
                        /* prepend menu icon */
                        jQuery('#nav-wrap').prepend('<div id="menu-icon">MENU</div>');
                        //alert ('test');
                        /* toggle nav */
                        $("#menu-icon").on("click", function(){
                                jQuery(".sf-menu").slideToggle();
                                jQuery(this).toggleClass("active");
                        });
                });