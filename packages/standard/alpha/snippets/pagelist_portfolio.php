<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>

<@~ if @{ :pagelistCount } > 2 ~@>
	<@ set { :classes: 'masonry am-stretched uk-grid uk-grid-width-small-1-2 uk-grid-width-large-1-3' } @>
<@~ else ~@>
	<@ set { :classes: 'uk-grid uk-grid-width-small-1-2 uk-grid-width-large-1-2' } @>
<@~ end ~@>

<ul class="@{ :classes }">
	<@ foreach in pagelist ~@>
		<li>
			<div class="uk-panel uk-panel-box">
				<@~ ../../snippets/set_imageteaser_variable.php @>
				<@~ if @{ :imageTeaser } @>
					<div class="uk-panel-teaser">
						<a href="@{ url }"><img src="@{ :imageTeaser }"></a>
					</div>
				<@~ end @>
				<div class="uk-panel-title">
					<a href="@{ url }">@{ title }</a>
					<@ subtitle.php @>
				</div>
				<p>
					<a href="@{ url }" class="nav-link panel-more">
						<svg class="bi bi-plus-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
							<path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>
							<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
						</svg>
					</a>
				</p>
			</div>
		</li>
	<@~ end @>
</ul>