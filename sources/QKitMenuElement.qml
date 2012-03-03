/*******************************************************************************
*                                                                              *
*  Element item for menus implementation.                                      *
*                                                                              *
*  Copyright (C) 2011 Kirill Chuvilin.                                         *
*  All rights reserved.                                                        *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirik-ch.ru)           *
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

import QtQuick 1.0

QKitDialogButton {
    id: menuElement
    objectName: "QKitMenuElement"

    logController: local.menuItem.logController
    uiController: local.menuItem.uiController
    keyController: local.menuItem.keyController
    navController: local.menuItem.navController

    width: local.menuItem.elementWidth
    height: local.menuItem.elementHeight

    onClicked: local.menuItem.active = false // to close menu after click on item

    Item { // local variables
        id: local
        property Item menuItem: menuElement.parent.parent.parent // menu item
    }
}
