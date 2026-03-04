<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('rhu_transaction', function (Blueprint $table) {
            $table->unsignedBigInteger('patientes_id')->nullable()->after('id');

            $table->foreign('patientes_id')
                  ->references('id')
                  ->on('rhu_patients')
                  ->onDelete('cascade'); // deletes records when patient is deleted
        });
    }

    public function down(): void
    {
        Schema::table('rhu_transaction', function (Blueprint $table) {
            $table->dropForeign(['patientes_id']);
            $table->dropColumn('patientes_id');
        });
    }
};