/*******************************************************************************
*                                                                              *
*  QKit library implementation.                                                *
*                                                                              *
*  Copyright (C) 2013 Kirill Chuvilin.                                         *
*  Contact: Kirill Chuvilin (kirill.chuvilin@gmail.com, kirill.chuvilin.pro)   *
*                                                                              *
*  This file is a part of the QKit project.                                    *
*  https://github.com/QKit/QKit                                                *
*                                                                              *
*  $QT_BEGIN_LICENSE:LGPL$                                                     *
*                                                                              *
*  GNU Lesser General Public License Usage                                     *
*  This file may be used under the terms of the GNU Lesser General Public      *
*  License version 3.0 as published by the Free Software Foundation and        *
*  appearing in the file LICENSE.LGPL included in the packaging of this file.  *
*  Please review the following information to ensure the GNU Lesser General    *
*  Public License version 3.0 requirements will be met:                        *
*  http://www.gnu.org/licenses/old-licenses/lgpl.html.                         *
*                                                                              *
*  GNU General Public License Usage                                            *
*  Alternatively, this file may be used under the terms of the GNU General     *
*  Public License version 3.0 as published by the Free Software Foundation     *
*  and appearing in the file LICENSE.GPL included in the packaging of this     *
*  file. Please review the following information to ensure the GNU General     *
*  Public License version 3.0 requirements will be met:                        *
*  http://www.gnu.org/copyleft/gpl.html.                                       *
*                                                                              *
*  This file is distributed in the hope that it will be useful, but WITHOUT    *
*  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or       *
*  FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for    *
*  more details.                                                               *
*                                                                              *
*  $QT_END_LICENSE$                                                            *
*                                                                              *
*******************************************************************************/

.pragma library

// core
Qt.include("QKitCore.js");
Qt.include("QKitSignal.js");
Qt.include("QKitObject.js");
// containers
Qt.include("QKitHash.js");
Qt.include("QKitLinkedList.js");
Qt.include("QKitList.js");
Qt.include("QKitMultiHash.js");
Qt.include("QKitSet.js");
Qt.include("QKitVector.js");

// global names
var instance   = QKit.instance;
var create     = QKit.create;
var destroy    = QKit.destroy;
var Signal     = QKit.Signal;
var Object     = QKit.Object;
var Hash       = QKit.Hash;
var LinkedList = QKit.LinkedList;
var List       = QKit.List;
var MultiHash  = QKit.MultiHash;
var Set        = QKit.Set;
var Vector     = QKit.Vector;
