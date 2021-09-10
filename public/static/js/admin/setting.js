/*
 |--------------------------------------------------------------------------
 | SkyCaiji (蓝天采集器)
 |--------------------------------------------------------------------------
 | Copyright (c) 2018 https://www.skycaiji.com All rights reserved.
 |--------------------------------------------------------------------------
 | 使用协议  https://www.skycaiji.com/licenses
 |--------------------------------------------------------------------------
 */
'use strict';function SettingClass(){this.caijiForm='#form_set';this.downImgForm='#form_set';this.pageRenderForm='#form_set';this.transForm='#form_set';this.siteForm='#form_set';this.emailForm='#form_set';this.storeForm='#form_set'}
SettingClass.prototype={constructor:SettingClass,ajax_userpwd:function(ajaxSet){var $_o=this;var oldSuccess=ajaxSet.success;ajaxSet.success=function(data){if(data.data&&data.data._userpwd_){if(data.msg){toastr.error(data.msg)}
confirmRight({closeAfterFunc:!0,yes:'确定',no:'取消',msg:('<div style="margin-bottom:8px;">该操作需要验证您的登录密码</div><input class="form-control" type="password" id="confirm_ipt_userpwd" />')},function(){var ajaxSetData=isNull(ajaxSet.data)?{}:ajaxSet.data;var userpwd=$('#confirm_ipt_userpwd').val();if(typeof(ajaxSetData)=='object'){ajaxSetData._userpwd_=userpwd}else{ajaxSetData=ajaxSetData?(ajaxSetData+'&'):'';ajaxSetData+='_userpwd_='+encodeURIComponent(userpwd)}
ajaxSet.data=ajaxSetData;ajaxSet.success=oldSuccess;$_o.ajax_userpwd(ajaxSet)})}else{if(oldSuccess&&typeof(oldSuccess)=='function'){oldSuccess(data)}}};ajaxOpen(ajaxSet)},caiji_init:function(caijiConfig){var $_o=this;caijiConfig=caijiConfig?caijiConfig:{};$($_o.caijiForm+' [name="auto"]').bind('click',function(){if($(this).val()>0){$('#set_caiji_run').show()}else{$('#set_caiji_run').hide()}});$($_o.caijiForm+' [name="run"]').bind('change',function(){$('#set_caiji_run .help-block').hide();$('#set_caiji_run .run-'+$(this).val()).show()});$($_o.caijiForm+' [name="server"]').bind('change',function(){$('#set_caiji_server .server-').hide();$('#set_caiji_server .server-cli').hide();$('#set_caiji_server .server-'+$(this).val()).show()});$('#btn_test_php').bind('click',function(){$_o.ajax_userpwd({type:'POST',dataType:'json',url:ulink('Setting/test_php'),data:{php:$($_o.caijiForm+' [name="server_php"]').val()},beforeSend:function(){$('#btn_test_php').text('测试中...').attr('disabled',!0)},success:function(data){if(data.code==1){toastr.success(data.msg)}else{toastr.error(data.msg)}},complete:function(){$('#btn_test_php').text('测试').removeAttr('disabled')}})});$($_o.caijiForm).bind('submit',function(){var formObj=$(this);var settings=getFormAjaxSettings(formObj);settings.complete=function(){formObj.find('button[type="submit"]').removeAttr('disabled')};$_o.ajax_userpwd(settings);return!1});$($_o.caijiForm+' [name="robots"][value="'+toInt(caijiConfig.robots)+'"]').prop('checked',!0);$($_o.caijiForm+' [name="auto"][value="'+toInt(caijiConfig.auto)+'"]').trigger("click");$($_o.caijiForm+' [name="run"]').val(caijiConfig.run?caijiConfig.run:'backstage').trigger("change");$($_o.caijiForm+' [name="server"]').val(caijiConfig.server).trigger("change");$($_o.caijiForm+' [name="real_time"][value="'+toInt(caijiConfig.real_time)+'"]').prop('checked',!0)},down_img_init:function(imgConfig){var $_o=this;imgConfig=imgConfig?imgConfig:{};$($_o.downImgForm+' [name="download_img"]').bind('click',function(){if($(this).val()==1){$('.content-wrapper').removeClass('wrapper-not-enable')}else{$('.content-wrapper').addClass('wrapper-not-enable')}});$($_o.downImgForm+' [name="img_name"]').bind('change',function(){if($(this).val()=='custom'){$('#img_name_custom').show()}else{$('#img_name_custom').hide()}});inputSelectCustom($_o.downImgForm+' [name="charset"]','charset_custom');$($_o.downImgForm+' .dropup-img-params .dropdown-menu a').bind('click',function(){var val=$(this).attr('data-val');if(val){var obj=$($_o.downImgForm).find('[name="img_func_param"]');var objVal=obj.val();objVal=objVal?(objVal+"\r\n"):'';obj.val(objVal+val)}});$($_o.downImgForm).on('click','.name-custom-path a[data-val]',function(){insertAtCaret($('[name="name_custom_path"]'),$(this).attr('data-val'))});for(var i in imgConfig){var ele=$($_o.downImgForm).find('[name="'+i+'"]').eq(0);if(!ele.is('input:radio')){ele.val(imgConfig[i])}}
if(imgConfig.img_func){showPanelCollapse('#panel_img_func')}
$($_o.downImgForm+' [name="download_img"][value="'+imgConfig.download_img+'"]').trigger("click");$($_o.downImgForm+' [name="data_image"][value="'+imgConfig.data_image+'"]').trigger("click");$($_o.downImgForm+' [name="img_name"]').trigger("change");$($_o.downImgForm+' [name="charset"]').trigger("change");loadPluginFunc({module:'downloadImg',boxObj:$_o.downImgForm,funcObj:'[name="img_func"]',paramObj:'[name="img_func_param"]',funcVal:imgConfig.img_func})},page_render_init:function(renderConfig){var $_o=this;renderConfig=renderConfig?renderConfig:{};$($_o.pageRenderForm+' [name="tool"]').bind('change',function(){var tool=$(this).val();$('[id^="render_tool_"]').hide();if(tool){$('#render_tool_'+tool).show()}});$('#btn_test_chrome').bind('click',function(){$_o.ajax_userpwd({type:'POST',dataType:'json',url:ulink('Setting/test_chrome'),data:$($_o.pageRenderForm).serialize(),beforeSend:function(){$('#btn_test_chrome').text('测试中...').attr('disabled',!0)},success:function(data){if(data.code==1){toastr.success(data.msg)}else{var warning=!1;if(data.msg.indexOf(':WARNING')>-1){warning=!0;if(data.msg.indexOf(':ERROR')>-1){warning=!1}}
if(warning){toastr.warning(data.msg)}else{toastr.error(data.msg)}}},complete:function(){$('#btn_test_chrome').text('测试').removeAttr('disabled')}})});$($_o.pageRenderForm).bind('submit',function(){var formObj=$(this);var settings=getFormAjaxSettings(formObj);settings.complete=function(){formObj.find('button[type="submit"]').removeAttr('disabled')};$_o.ajax_userpwd(settings);return!1});$($_o.pageRenderForm+' [name="tool"]').val(renderConfig.tool).trigger('change')},translate_init:function(transConfig){var $_o=this;transConfig=transConfig?transConfig:{};$($_o.transForm+' [name="open"]').bind('click',function(){if($(this).val()==1){$('.content-wrapper').removeClass('wrapper-not-enable')}else{$('.content-wrapper').addClass('wrapper-not-enable')}});$($_o.transForm+' [name="api"]').bind('change',function(){$('[id^="api_"]').hide();$('#api_'+$(this).val()).show()});$($_o.transForm+' [name="open"][value="'+toInt(transConfig.open)+'"]').trigger('click');$($_o.transForm+' [name="api"]').val(transConfig.api).trigger("change");$($_o.transForm+' [name="pass_html"][value="'+toInt(transConfig.pass_html)+'"]').trigger('click')},site_init:function(siteConfig){var $_o=this;siteConfig=siteConfig?siteConfig:{};siteConfig.login=siteConfig.login?siteConfig.login:{};$($_o.siteForm+' [name="verifycode"]').bind('click',function(){if($(this).val()==1){$('#verifycode_len').show()}else{$('#verifycode_len').hide()}});$($_o.siteForm+' [name="login[limit]"]').bind('click',function(){if($(this).val()==1){$('#login_limit').show()}else{$('#login_limit').hide()}});$($_o.siteForm+' #btn_timezone').bind('click',function(){var nowTime=new Date();var offset=nowTime.getTimezoneOffset()/60;ajaxOpen({type:'post',url:ulink("setting/site_timezone"),data:{time:nowTime.getTime(),offset:offset},dataType:'json',success:function(data){if(data.code==1){if(data.data&&data.data.timezone){if($($_o.siteForm+' [name="timezone"]').find('option[value="'+data.data.timezone+'"]').length>0){$($_o.siteForm+' [name="timezone"]').val(data.data.timezone)}else{toastr.error('自动调整失败，请手动选择！')}}}else{if(data.msg){toastr.error(data.msg)}}}})});$($_o.siteForm+' [name="verifycode"][value="'+toInt(siteConfig.verifycode)+'"]').attr('checked','checked').trigger('click');$($_o.siteForm+' [name="hidehome"][value="'+toInt(siteConfig.hidehome)+'"]').attr('checked','checked');$($_o.siteForm+' [name="closelog"][value="'+toInt(siteConfig.closelog)+'"]').attr('checked','checked');$($_o.siteForm+' [name="dblong"][value="'+toInt(siteConfig.dblong)+'"]').attr('checked','checked');$($_o.siteForm+' [name="login[limit]"][value="'+toInt(siteConfig.login.limit)+'"]').attr('checked','checked').trigger('click');$($_o.siteForm+' [name="closetrans"][value="'+toInt(siteConfig.closetrans)+'"]').attr('checked','checked');$($_o.siteForm+' [name="timezone"]').val(siteConfig.timezone)},email_init:function(emailConfig){var $_o=this;emailConfig=emailConfig?emailConfig:{};$('#btn_test').bind('click',function(){$($_o.emailForm+' [name="is_test"]').val(1);$($_o.emailForm).submit()});$($_o.emailForm+' button[type="submit"]').bind('click',function(){$($_o.emailForm+' [name="is_test"]').val(0)});$($_o.emailForm+' [name="type"][value="'+emailConfig.type+'"]').attr('checked','checked')},store_init:function(storeConfig){var $_o=this;storeConfig=storeConfig?storeConfig:{};$($_o.storeForm).bind('submit',function(){var obj=$(this);ajaxOpen({type:'post',url:obj.attr('action'),dataType:'json',data:obj.serialize(),success:function(data){if(data.code==1){ajaxDataMsg(data)}else{if(data.msg){toastr.error(data.msg)}
var data=data.data;if(data&&data.same_as_pwd){confirmRight(data.same_as_pwd,function(){obj.find('[name="same_as_pwd"]').val(1);obj.trigger('submit')})}}}});return!1});$('#provider_authkeys_iframe').bind('load',function(){var mainheight=$(this).contents().find('body').height()+1;$(this).height(mainheight)})}}
var settingClass=new SettingClass()