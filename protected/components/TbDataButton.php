<?php

Yii::import('application.extensions.booster.widgets.TbButtonColumn');

class TbDataButton extends TbButtonColumn {

    protected function renderButton($id, $button, $row, $data) {

        if (isset($button['visible']) && !$this->evaluateExpression(
                        $button['visible'], array('row' => $row, 'data' => $data)
                )
        ) {
            return;
        }

        $label = isset($button['label']) ? $button['label'] : $id;
        $url = isset($button['url']) ? $this->evaluateExpression($button['url'], array('data' => $data, 'row' => $row)) : '#';
        $options = isset($button['options']) ? $button['options'] : array();

        if (!isset($options['title'])) {
            $options['title'] = $label;
        }

        if (isset($options['evaluateOptions'])) {
            foreach ($options['evaluateOptions'] as $key => $value) {
                $options[$value] = $this->evaluateExpression($options[$value], array('data' => $data, 'row' => $row));
            }

            unset($options['evaluateOptions']);
        }

        if (!isset($options['data-toggle'])) {
            $options['data-toggle'] = 'tooltip';
        }

        if (isset($button['icon']) && $button['icon']) {
            if (strpos($button['icon'], 'icon') === false && strpos($button['icon'], 'fa') === false) {
                $button['icon'] = 'glyphicon glyphicon-' . implode('glyphicon-', explode(' ', $button['icon']));
            }

            echo CHtml::link('<i class="' . $button['icon'] . '"></i>', $url, $options);
        } else if (isset($button['imageUrl']) && is_string($button['imageUrl'])) {
            echo CHtml::link(CHtml::image($button['imageUrl'], $label), $url, $options);
        } else {
            echo CHtml::link($label, $url, $options);
        }
    }

}
