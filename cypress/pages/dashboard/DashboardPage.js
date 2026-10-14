import validate from "../../utils/validate"

class DashboardPage {
    locators = {
        dashboardWidget: '.orangehrm-dashboard-widget',
        dashboardWidgetName: '.orangehrm-dashboard-widget-name'
    }

    validateWidgetIsVisible(widgetName) {
        validate.elementVisible({
            parentSelector: this.locators.dashboardWidget,
            selector: this.locators.dashboardWidgetName,
            text: widgetName
        })
    }

    validateWidgetIsNotVisible(widgetName) {
        validate.elementNotExist({
            parentSelector: this.locators.dashboardWidget,
            selector: this.locators.dashboardWidgetName,
            text: widgetName
        })
    }
}

export default new DashboardPage();