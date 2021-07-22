<?php

class Filtro extends CFormModel
{
  public $desde;
  public $hasta;

  
  public function rules()
  {
    return array(
      array('desde, hasta', 'required'),
    );
  }
  
  public function attributeLabels()
  {
    return array(
      'desde'=>'Fecha desde',
      'hasta'=>'Fecha hasta',
      
    );
  }
  

}