import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/auth.decorator';
import UserDto from 'src/usuarios/dto/user.dto';
import { DetallesCarritoService } from './detalles-carrito.service';
import { AddDetalleCarritoDto } from './dto/add-detalle-carrito.dto';
import { UpdateDetalleCarritoDto } from './dto/update-detalle-carrito.dto';

@UseGuards(AuthGuard())
@Controller('detalles-carrito')
export class DetallesCarritoController {
  constructor(private readonly carritoService: DetallesCarritoService) {}

  @Get()
  async findByUserId(@Auth() { id }: UserDto) {
    console.log(id);
    return await this.carritoService.findDetallesCarritoByUsuarioId(id);
  }

  @Post()
  async addDetalleCarrito(
    @Auth() { id }: UserDto,
    @Body() addDetalleCarritoDto: AddDetalleCarritoDto,
  ) {
    return await this.carritoService.addDetalleCarritoByUsuarioId(
      id,
      addDetalleCarritoDto,
    );
  }

  @Put(':id')
  async updateDetalleCarrito(
    @Auth() { id }: UserDto,
    @Param('id') idDetalle,
    @Body() updateDetalleCarritoDto: UpdateDetalleCarritoDto,
  ) {
    return await this.carritoService.updateDetalleCarritoByUsuarioId(
      id,
      idDetalle,
      updateDetalleCarritoDto,
    );
  }

  @Delete(':id')
  async deleteDetalleCarrito(@Auth() { id }: UserDto, @Param('id') idDetalle) {
    await this.carritoService.deleteDetalleCarritoByUsuarioId(id, idDetalle);
    return;
  }
}
