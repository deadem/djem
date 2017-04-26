<?php

namespace App\Doctypes;

use DJEM\Main\Grid;
use Illuminate\Http\Request;

class Contentor extends \DJEM\Doctype
{
    public $model = null;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function grid()
    {
        return Grid::custom($this);
    }


    private function getStyles()
    {
        return '
            <style>
                body {
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                .buttonField .x-btn-button {
                    background-color: silver;
                }
                .canvas .x-autocontainer-outerCt {
                    background-color: red;
                }
                .canvas div {
                    background: none;
                }
                .x-panel.component {
                    background-color: silver;
                    line-height: 50px;
                    padding: 0 10px;
                    margin-bottom: 5px;
                }
                .x-panel.component .x-autocontainer-innerCt {
                    background-color: silver;
                }
                .selected {
                    outline: blue solid 3px !important;
                    outline-offset: -3px !important;
                    position: relative;
                }
/*
                .selected:after {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    content: "";
                    display: block;
                    background: rgba(0,0,128,0.3);
                    z-index: 100;
                    left: 0;
                    top: 0;
                }
*/
                .buttonField {
                    background-color: powderblue;
                    margin-bottom: 5px;
                    cursor: pointer;
                    padding-left: 10px;
                }
                .buttonField .text {
                    display: inline-block;
                    line-height: 35px;
                    font-size: 16px;
                    color: #444;
                    padding-left: 5px;
                }
                .buttonField .icon {
                    width: 30px;
                    font-family: "Icons";
                    display: inline-block;
                    font-size: 24px;
                    line-height: 35px;
                    color: #333;
                }
                .canvas .layout {
                    outline: black dotted 1px;
                    outline-offset: -1px;
                    min-height: 100px;
                    paddind: 20px;
                    background-color: rgba(0,0,128,0.3);
                }
            </style>
        ';
    }

    public function editor()
    {
        $editor = parent::editor();

        $editor->createLayout('hbox')->flex(1)->items(function ($i) {
            $i->addStaticHtml($this->getStyles());
            $i->addItem('editor')->xtype('djem.formBuilder')->flex(1);
        });

        return $editor;
    }

    public function loadRelation($field)
    {
        if (method_exists($this->model, $field)) {
            $model = (new $this->model)->$field()->getRelated();
        }

        $items = $this->searchItems($model);
        $total = $items->count();
        if ($total && method_exists($items, 'total')) {
            $total = $items->total();
        }
        $items = $items->map(function ($item) {
            return [
                'value' => $item->id,
                'text' => $item->name,
            ];
        });

        return [
            'items' => $items->all(),
            'total' => $total,
        ];
    }

    public function getSubtypes()
    {
        return [
            ['_doctype' => self::class, 'name' => 'Undo'],
            ['_doctype' => self::class, 'name' => 'Redo'],
            ['_doctype' => self::class, 'name' => 'Save'],
            ['_doctype' => self::class, 'name' => 'Delete'],
            ['_doctype' => self::class, 'name' => 'Preview'],
        ];
    }
}
