<style type="text/css">
    div.copied {
        position: fixed;
        top: 100px;
        left: 50%;
        width: 200px;
        text-align: center;
        color: #3c763d;
        background-color: #dff0d8;
        border: 1px solid #d6e9c6;
        padding: 10px 15px;
        border-radius: 4px;
        margin-left: -100px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
    table.colors {
        width: 100%;
        height: 100%;
        max-height: 700px;
        table-layout: fixed;
    }
    table.colors td {
        color: rgba(255, 255, 255, 0.5);
        line-height: 20px;
        padding: 10px;
        font-size: 14px;
        cursor: pointer;
    }
    table.colors tr.empty {
        display: none;
    }
</style>
<table class="colors">
    <tr>
        <td data="red" class="bgcolor-red">Red</td>
        <td data="pink" class="bgcolor-pink">Pink</td>
        <td data="purple" class="bgcolor-purple">Purple</td>
        <td data="deep-purple" class="bgcolor-deep-purple">Deep Purple</td>
        <td data="indigo" class="bgcolor-indigo">Indigo</td>
        <td data="blue" class="bgcolor-blue">Blue</td>
        <td data="light-blue" class="bgcolor-light-blue">Light Blue</td>
        <td data="cyan" class="bgcolor-cyan">Cyan</td>
        <td data="teal" class="bgcolor-teal">Teal</td>
        <td data="green" class="bgcolor-green">Green</td>
        <td data="light-green" class="bgcolor-light-green">Light Green</td>
        <td data="lime" class="bgcolor-lime">Lime</td>
        <td data="yellow" class="bgcolor-yellow">Yellow</td>
        <td data="amber" class="bgcolor-amber">Amber</td>
        <td data="orange" class="bgcolor-orange">Orange</td>
        <td data="deep-orange" class="bgcolor-deep-orange">Deep Orange</td>
        <td data="brown" class="bgcolor-brown">Brown</td>
        <td data="grey" class="bgcolor-grey">Grey</td>
        <td data="blue-grey" class="bgcolor-blue-grey">Blue Grey</td>
    </tr>

    @foreach(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as $number)
    <tr>
        @foreach(['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'] as $color)
        <td class="bgcolor-{{$color}}-{{$number}}" data="{{$color}}-{{$number}}">{{$number}}</td>
        @endforeach
    </tr>
    @endforeach
    <tr class="empty">
        @for ($i = 0; $i < 16;++$i)<td></td>@endfor
        <td rowspan="4"></td>
    </tr>

    @foreach(['A100', 'A200', 'A400', 'A700'] as $number)
    <tr>
        @foreach(['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange'] as $color)
        <td class="bgcolor-{{$color}}-{{$number}}" data="{{$color}}-{{$number}}">{{$number}}</td>
        @endforeach
    </tr>
    @endforeach
</table>
