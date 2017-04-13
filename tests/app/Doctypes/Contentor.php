<?php

namespace App\Doctypes;

use DJEM\Main\Grid;
use Illuminate\Http\Request;

class Contentor extends \DJEM\Doctype
{
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
                    border: black solid 5px;
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
}
