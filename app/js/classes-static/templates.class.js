/**
 * @author ©Towns.cz
 * @fileOverview Creates object Templates with static methods
 */
//======================================================================================================================

/**
 * Container of html templates
 */
var Templates={};


/**
 * left menu item //todo objectmenu vs leftmenu?
 * @static
 * @param {object} params
 * @return {string} html
 */
Templates.objectMenu = function(params){


    return `<div class="action-wrapper">

        <div class="action js-popup-action-open"`+

            (defined(params.icon)?` style="background: url('`+params.icon+`');background-size: cover;"`:``)+
            (defined(params.title)?` popup_title="`+params.title+`"`:``)+//todo towns:title as xml namespace
            (defined(params.content)?` content="`+params.content+`"`:``)+
            (defined(params.action)?` action="`+params.action+`"`:``)+`>`+
            (defined(params.inner)?params.inner:``)+

        `</div>
    </div>
    `;
};



