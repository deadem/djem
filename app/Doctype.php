<?php

namespace DJEM;

use Request;

/**
 * Base doctype.
 */
class Doctype extends \Illuminate\Routing\Controller
{
    /**
     * Editable model.
     *
     * @var class
     */
    public $model;

    /**
     * Grid view.
     *
     * @return array
     */
    public function gridView()
    {
        return [];
    }

    /**
     * Load relation by request from admin panel.
     * @var string relation name
     * @return array related data
     */
    public function loadRelation($relation)
    {
        $relation;
        abort(400, 'You must override Doctype::loadRelation()');
    }

    public function delete()
    {
    }

    /**
     * Creatable Doctypes list.
     *
     * @return array
     */
    public function getDoctypes()
    {
        return [];
    }

    /**
     * Extend context menu.
     *
     * @return array
     */
    public function getContextMenu()
    {
        return [];
    }

    /**
     * Grid for curent Doctype.
     *
     * @return array
     */
    public function grid()
    {
        return new Main\GridBuilder();
    }

    /**
     * Instantiate editor.
     *
     * @return Editor
     */
    public function editor()
    {
        return (new Editor\Editor($this->model))->setInput(Request::all());
    }

    /**
     * Save model handler.
     */
    public function save()
    {
        $editor = $this->editor()->putData();
        if ($editor->model()->id) {
            Request::merge(['id' => $editor->model()->id]);
        }

        return $editor;
    }

    /**
     * Load model handler.
     */
    public function load()
    {
        $editor = $this->editor();

        return [
            'data' => $editor->getData(),
            'view' => $editor->getView(),
        ];
    }
}
