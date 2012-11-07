/*******************************************************************************
*                                                                              *
*  TextInput item implementation.                                              *
*                                                                              *
*  Copyright (C) 2011-2012 Kirill Chuvilin.                                    *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is part of the QKit project.                                      *
*                                                                              *
*  $QT_BEGIN_LICENSE:GPL$                                                      *
*  You may use this file under the terms of the GNU General Public License     *
*  as published by the Free Software Foundation; version 3 of the License.     *
*                                                                              *
*  This file is distributed in the hope that it will be useful,                *
*  but WITHOUT ANY WARRANTY; without even the implied warranty of              *
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                *
*  GNU General Public License for more details.                                *
*                                                                              *
*  You should have received a copy of the GNU General Public License           *
*  along with this package; if not, write to the Free Software                 *
*  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.   *
*  $QT_END_LICENSE$                                                            *
*                                                                              *
*******************************************************************************/

import Qt 4.7

TextInput {
    id: item
    objectName: "QKitTextInput"
    // controllers
    property Item controllerSource: parent // source of controller items
    property QtObject logController: controllerSource.logController // logging settings
    property QtObject uiController:  controllerSource.uiController  // item with UI settings
    property QtObject keyController: controllerSource.keyController // item with key settings
    property QtObject navController: controllerSource.navController // key navigation controllerler
    // QKit properties
    property bool active: true // active or not
    property bool selected: activeFocus // selected or not
    property string uiAmbience: controllerSource.uiAmbience // UI ambience: dialog, page, toolbar
    // logging
    Component.onCompleted: if (logController && logController.createdLogging) console.log(item.objectName + " - created")
    onParentChanged: if (logController && logController.parentLogging) console.log(item.objectName + " - parent changed to " + (item.parent ? item.parent.objectName : "[NULL]"))
    onActiveChanged: if (logController && logController.activeLogging) console.log(item.objectName + " - active changed to " + active)
    onSelectedChanged: if (logController && logController.selectedLogging) console.log(item.objectName + " - selected changed to " + selected)
    onFocusChanged: if (logController && logController.focusLogging) console.log(item.objectName + " - focus changed to " + focus)
    onActiveFocusChanged: if (logController && logController.activeFocusLogging) console.log(item.objectName + " - activeFocus changed to " + activeFocus)
}