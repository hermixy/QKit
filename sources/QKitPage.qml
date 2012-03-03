/*******************************************************************************
*                                                                              *
*  Page item implementation.                                                   *
*                                                                              *
*  Copyright (C) 2011 Kirill Chuvilin.                                         *
*  All rights reserved.                                                        *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirik-ch.ru)           *
*                                                                              *
*  This file is part of the Folder Gallery project.                            *
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

QKitRectangle {
    id: page
    objectName: "QKitPage"

    property Item toolbar
    property color backgroundColor: uiController.pageBackgroundColor
    property color textColor: uiController.pageTextColor
    property url   texture: uiController.pageTexture

    signal backToggled() // goto previos page signal
    signal menuToggled() // open menu signal

    anchors.fill: parent
    color: backgroundColor

    Image {
        anchors.fill: parent
        fillMode: Image.Tile
        source: page.texture
    }

    Keys.onPressed: {
        if (toolbar) // if toolbar exists
            toolbar.keyPressedEvent(event) // send first to toolbar
        if (!event.accepted) { // if wasn't acceptet by toolbar
            switch (event.key) {
            case Qt.Key_Backspace:
                backToggled()
                break
            case Qt.Key_Escape:
                menuToggled()
                break
            default:
                return
            }
            event.accepted = true
        }
    }

    onVisibleChanged: if (visible) focus = true // to focuse on current page
    onToolbarChanged: toolbar.parent = page
}
