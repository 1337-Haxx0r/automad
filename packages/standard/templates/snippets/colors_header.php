<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>	
<@~ if @{ colorText } or @{ colorBg } or @{ colorBorder } or @{ colorMuted } or @{ colorPanelBg } or @{ colorCode } ~@>
	<style>:root.@{ theme | sanitize } {<@ colors.php @>}</style>
<@~ end @>